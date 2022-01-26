import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MultiChoiceDialogComponent } from '../multi-choice-dialog/multi-choice-dialog.component';
import { WorkoutService } from '../services/workout.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'app-workout-picker',
  templateUrl: './workout-picker.component.html',
  styleUrls: ['./workout-picker.component.scss']
})
export class WorkoutPickerComponent implements OnInit, OnDestroy {
  model: string = 'WorkoutPickerComponent';
  workoutList: any[] = [];

  constructor(
    private router: Router,
    private workoutService: WorkoutService,
    public dialog: MatDialog) {}


  ngOnInit(): void {
    this.workoutList = this.workoutService.getConfiguredWorkoutList;

    if (this.workoutList?.length === 0) {
      setTimeout(() => {
        this.workoutService.fetchAllWorkouts();
      }, Constants.FIREBASE_DELAY);
    }
  }

  ngOnDestroy(): void {
    this.workoutList = [];
  }

  displayExercises(forThisWorkout) {
    this.router.navigate(['exercises'], {queryParams: {workout: forThisWorkout}});
  }

  addWorkout() {
    const dialogConfig = {
      data: {
        question: "Nom du groupe musculaire :",
        inputRequested: true
      }
    };

    this.dialog.open(MultiChoiceDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((newWorkoutName: string) => {
        if (newWorkoutName?.trim().length > 0) {
          this.workoutService.addWorkout(newWorkoutName);
        }
      });
  }
}
