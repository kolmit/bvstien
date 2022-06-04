import { Component, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent, MatTabGroup, MatTabsConfig } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Program } from '../model/program.model';
import { MultiChoiceDialogComponent } from '../multi-choice-dialog/multi-choice-dialog.component';
import { ProgramService } from '../services/program.service';
import { SnackbarService } from '../services/snackbar.service';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-workout-picker',
  templateUrl: './workout-picker.component.html',
  styleUrls: ['./workout-picker.component.scss']
})
export class WorkoutPickerComponent implements OnInit, OnDestroy {
  model: string = 'WorkoutPickerComponent';
  workoutSubscription: Subscription;
  programsSubscription: Subscription;

  workoutList: any[] = [];
  programList: Program[] = [];
  selectedProgramIndex: number;

  constructor(
    private router: Router,
    private workoutService: WorkoutService,
    private programService: ProgramService, 
    private snackbarService: SnackbarService,
    public dialog: MatDialog) {}


  ngOnInit(): void {
    this.workoutList = this.workoutService.getConfiguredWorkoutList;
    this.programList = this.programService.getConfiguredPrograms;

    this.workoutSubscription = this.workoutService.fetchAllWorkouts().subscribe( (workouts) => {
      this.workoutList = workouts;
     });
    this.programsSubscription = this.programService.fetchAllPrograms().subscribe( (programs) => {
      this.programList = programs;
      this.selectedProgramIndex = this.programService.selectedProgramTab >= 0 ? this.programService.selectedProgramTab : 1;
    });

  }

  ngOnDestroy(): void {
    this.workoutList = [];
    this.programsSubscription ? this.programsSubscription.unsubscribe() : null;
    this.workoutSubscription ? this.workoutSubscription.unsubscribe() : null;
  }

  displayExercises(forThisWorkout) {
    this.router.navigate(['exercises'], {queryParams: {workout: forThisWorkout}});
  }

  addWorkout(programIndex: number, programName: string) {
    const dialogConfig = {
      data: {
        question: "Nom du groupe musculaire",
        inputRequested: true
      }
    };
    let s: string = 'a';
    s.toUpperCase();
    this.dialog.open(MultiChoiceDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((newWorkoutName: string) => {
        if (newWorkoutName?.trim().length > 0) {
          // Si le groupe musculaire existe déjà, on ne le rajoute pas (pour ne pas écraser les anciennes données du groupe musculaire)
          if (!this.workoutList.map(w => w.name.toUpperCase()).includes(newWorkoutName.toUpperCase())) {
            this.workoutService.addWorkout(newWorkoutName);
            this.programService.addWorkoutToProgram(newWorkoutName, programIndex, programName);
          } else {
            this.snackbarService.openSnackBar('Ce groupe musculaire/cette séance existe déjà. ❌');
          }
        }
      });
  }

  addProgram() {
    const dialogConfig = {
      data: {
        question: 'Ajouter un programme',
        inputRequested: true
      }
    };
    this.dialog.open(MultiChoiceDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((newProgramName: string) => {
        const existingProgramNames = this.programList.map(p => p.programName.toUpperCase())
        if (newProgramName?.trim().length > 0) {
          if (existingProgramNames?.includes(newProgramName.toUpperCase())) {
            return this.snackbarService.openSnackBar('Un programme porte déjà ce nom. ❌');
          }
          this.programService.saveProgram([], this.programList.length, newProgramName);
        }
    });
  }

  managePrograms(tabGroup: MatTabGroup) {
    
  }

  selectedProgramChanged(event: MatTabChangeEvent) {
    this.programService.setProgramSelected(event.index);
  }
}