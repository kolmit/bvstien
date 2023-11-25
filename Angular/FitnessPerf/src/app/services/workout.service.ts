import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as workouts from '../../assets/workouts.json';
import { Exercise } from '../model/exercise.model';
import { Program } from '../model/program.model';
import { Workout } from '../model/workout.model';
import { Constants } from '../utils/constants';
import { BaseService } from './base.service';
import { SessionService } from './session.service';
import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService extends BaseService{

  static defaultWorkoutList: any[] = (workouts as any).default;
  configuredWorkoutList: any[] = [];
  allSessionInit: boolean = false;

  constructor(firestore: AngularFirestore,
    private snackbarService: SnackbarService,
    private sessionService: SessionService) {
      super(firestore);

      if (localStorage.getItem('login') !== null) {
        this.fetchAllWorkouts();
      }
  }

  onDestroy() {
    this.configuredWorkoutList = [];
  }

  insertDefaultWorkoutList(): void {
    this.insertWorkout(WorkoutService.defaultWorkoutList);
  }

  // TODO : Ne faire qu'une seule écriture avec une liste.
  insertWorkout(workouts: Workout[]) {
    for (let element of workouts) {
      let e: any = {[element.name]: element.exercises};

      this.getUserDataDocuments()
        .collection(Constants.USER_EXERCISES)
        .doc(element.name)
        .set(e)
        .catch( (err) => {
          this.snackbarService.openSnackBar('Erreur technique', err);
        });
    }
  }

   /** Charge tous les muscles avec les noms des exercices configurés. */
  fetchAllWorkouts(): Observable<any> {
    return this.getUserDataDocuments()
      .collection(Constants.USER_EXERCISES) // TODO : Ne fetch que les exo du programme consulté.
      .valueChanges()
      .pipe( 
        map((allWorkoutElement: any) => {
          allWorkoutElement.forEach(element => {
            let workoutName = Object.keys(element)[0];
            const workoutIndex = this.configuredWorkoutList.findIndex(e => e.name === workoutName);
            
            if (workoutIndex === -1) {
              this.configuredWorkoutList.push( {name: workoutName, exercises: element[workoutName]})
            } else {
              this.configuredWorkoutList[workoutIndex] = {name: workoutName, exercises: element[workoutName]};
            }
          });

          // On charge d'avance les séances pour + de fluidité, pouvoir afficher la timeline.
          if (!this.allSessionInit) {
            this.sessionService.prefetchAllSessions(this.configuredWorkoutList);
            this.allSessionInit = true;
          }
          
          return this.configuredWorkoutList;
        })
      );
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

  addWorkout(newWorkoutName: string, exerciseList?: string[]) {
    let newWorkout: Workout = {name: newWorkoutName, exercises: (exerciseList ? exerciseList : []) as any[]};
    this.insertWorkout([newWorkout])
  }
}