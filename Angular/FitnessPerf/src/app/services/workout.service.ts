import { Injectable } from '@angular/core';
import * as workouts from '../../assets/workouts.json';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  workoutList: any[] = (workouts as any).default;

  constructor() { }

  getWorkoutList(): any[] {
    return this.workoutList;
  }

  getExercises(workout: string) {
    return this.workoutList.find(elt => elt.workout === workout)?.exercises;
  }
}