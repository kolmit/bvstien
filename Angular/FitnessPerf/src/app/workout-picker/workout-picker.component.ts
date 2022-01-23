import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MultiChoiceDialogComponent } from '../multi-choice-dialog/multi-choice-dialog.component';
import { WorkoutService } from '../services/workout.service';

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
    this.workoutService.fetchAllWorkouts();
    this.workoutList = this.workoutService.getConfiguredWorkoutList;
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
