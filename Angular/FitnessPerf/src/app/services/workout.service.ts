import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as workouts from '../../assets/workouts.json';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  defaultWorkoutList: any[] = (workouts as any).default;
  configuredWorkoutList: any[] = [];

  constructor(private firestore: AngularFirestore) {
    if (localStorage.getItem('login') !== null) {
      this.fetchAllWorkouts();
    }
  }


  insertAllDefaultWorkout() {
    for (let element of this.defaultWorkoutList) {
      let e: any = {[element.name]: element.exercises};

      this.firestore
        .collection(Constants.USER_DATA)
        .doc(localStorage.getItem('login'))
        .collection(Constants.USER_EXERCISES)
        .doc(element.name)
        .set(e);
    }
    this.configuredWorkoutList = this.defaultWorkoutList;
  }

   /** Charge tous les muscles avec les noms des exercices configurés. */
  fetchAllWorkouts() {
    this.firestore
      .collection(Constants.USER_DATA)
      .doc(localStorage.getItem('login'))
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

  getDefaultWorkoutList(): any[] {
    return this.defaultWorkoutList;
  }

  getDefaultExercises(workout: string) {
    return this.defaultWorkoutList.find(elt => elt.workout === workout)?.exercises;
  }

  getConfiguredExercises(workout: string): string[] {
    const workoutIndex = this.configuredWorkoutList.findIndex(e => e.name === workout);
    if (workoutIndex !== -1) {
      return this.configuredWorkoutList[workoutIndex].exercises;
    }
  }
}