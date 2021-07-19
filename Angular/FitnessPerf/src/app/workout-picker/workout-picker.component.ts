import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workout-picker',
  templateUrl: './workout-picker.component.html',
  styleUrls: ['./workout-picker.component.scss']
})
export class WorkoutPickerComponent implements OnInit {

  workoutList: any[] = [];

  constructor(
    private router: Router,
    private workoutService: WorkoutService,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.workoutList = this.workoutService.getWorkoutList();
  }


  displayExercises(forThisWorkout) {
    this.router.navigate(['exercises'], {queryParams: {workout: forThisWorkout}});
  }

}
