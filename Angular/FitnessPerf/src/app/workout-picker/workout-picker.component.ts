import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workout-picker',
  templateUrl: './workout-picker.component.html',
  styleUrls: ['./workout-picker.component.scss']
})
export class WorkoutPickerComponent implements OnInit {
  model: string = 'WorkoutPickerComponent';
  workoutList: any[] = [];

  constructor(
    private router: Router,
    private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutList = this.workoutService.getDefaultWorkoutList();
  }

  displayExercises(forThisWorkout) {
    this.router.navigate(['exercises'], {queryParams: {workout: forThisWorkout}});
  }
}
