import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import * as workouts from '../../assets/workouts.json';
import { Workout } from '../model/workout.model';
import { Constants } from '../utils/constants';
import { BaseService } from './base.service';
import { SnackbarService } from './snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService extends BaseService{

  static defaultWorkoutList: any[] = (workouts as any).default;
  configuredWorkoutList: any[] = [];
  allWorkoutsSubscription: Subscription;

  constructor(firestore: AngularFirestore,
    private snackbarService: SnackbarService) {
      super(firestore);

      if (localStorage.getItem('login') !== null) {
        this.fetchAllWorkouts();
      }
  }

  onDestroy() {
    this.configuredWorkoutList = [];
    this.allWorkoutsSubscription.unsubscribe();
  }

  insertDefaultWorkoutList(): void {
    this.insertWorkout(WorkoutService.defaultWorkoutList)
  }

  insertWorkout(workouts: Workout[]) {
    for (let element of workouts) {
      let e: any = {[element.name]: element.exercises};

      this.getUserDataDocuments()
        .collection(Constants.USER_EXERCISES)
        .doc(element.name)
        .set(e)        
        .catch( () => {
          this.snackbarService.openSnackBar('Erreur technique', 'Problème lors de l\'enregistrement du workout');
        });
    }
  }

   /** Charge tous les muscles avec les noms des exercices configurés. */
  fetchAllWorkouts() {
    this.allWorkoutsSubscription = this.getUserDataDocuments()
      .collection(Constants.USER_EXERCISES)
      .valueChanges()
      .subscribe( (allWorkoutElement) => {
        allWorkoutElement.forEach(element => {
          let workoutName = Object.keys(element)[0];
          const workoutIndex = this.configuredWorkoutList.findIndex(e => e.name === workoutName);
          
          if (workoutIndex === -1) {
            this.configuredWorkoutList.push( {name: workoutName, exercises: element[workoutName]})
          } else {
            this.configuredWorkoutList[workoutIndex] = {name: workoutName, exercises: element[workoutName]};
          }
        });
      });
  }

  get getConfiguredWorkoutList(): any[] {
    return this.configuredWorkoutList;
  }

  getConfiguredExercises(workout: string): string[] {
    const workoutIndex = this.configuredWorkoutList.findIndex(e => e.name === workout);
    if (workoutIndex !== -1) {
      return this.configuredWorkoutList[workoutIndex].exercises;
    }
  }

  updateConfiguredExercises(workoutName: string, exerciseList: string[]) {
    const workoutIndex = this.configuredWorkoutList.findIndex(e => e.name === workoutName);
    if (workoutIndex !== -1) {
      this.configuredWorkoutList[workoutIndex].exercises = exerciseList;
    }
  }

    /** Ajoute un exercice dans la configuration de l'utilisateur */
    addUserExercise(workoutName: string, exerciseName: string): void{
      this.getUserDataDocuments()
        .collection(Constants.USER_EXERCISES)
        .doc(workoutName)
        .valueChanges()
        .subscribe( (res) => {
          const exerciseList: string[] = res[workoutName];
  
          if (!exerciseList || exerciseList.findIndex(exo => exo === exerciseName) >= 0) {
            return;
          }
          exerciseList.push(exerciseName);
          this.updateUserExercises(workoutName, exerciseList);
        });
    }
  
    /** Supprime un exercice dans la configuration de l'utilisateur */
    deleteUserExercise(workoutName: string, exerciseName: string): void{
      this.getUserDataDocuments()
        .collection(Constants.USER_EXERCISES)
        .doc(workoutName)
        .valueChanges()
        .subscribe( (res) => {
          const exerciseList: string[] = res[workoutName];
          const indexToDelete = exerciseList.findIndex(exo => exo === exerciseName);
  
          if (indexToDelete < 0){
            return; 
          } else {
            // On met à jour la liste des exercices en mémoire
            exerciseList.splice(indexToDelete, 1);
            this.updateUserExercises(workoutName, exerciseList);
          }
        });
    }
  
    updateUserExercises(workoutName: string, exerciseList): void {
      let e: any = {[workoutName]: exerciseList};
  
      this.getUserDataDocuments()
        .collection(Constants.USER_EXERCISES)
        .doc(workoutName)
        .set(e);
  
      this.updateConfiguredExercises(workoutName, exerciseList);
    }

  addWorkout(newWorkoutName: string) {
    let newWorkout: Workout = {name: newWorkoutName, exercises: []};
    this.insertWorkout([newWorkout])
  }
}