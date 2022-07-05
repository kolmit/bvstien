import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Program } from '../model/program.model';
import { MultiChoiceDialogComponent } from '../multi-choice-dialog/multi-choice-dialog.component';
import { ProgramService } from '../services/program.service';
import { SnackbarService } from '../services/snackbar.service';
import { WorkoutService } from '../services/workout.service';
import { ManageWorkoutToProgramDialogComponent } from './partials/manage-workout-to-program-dialog/manage-workout-to-program-dialog.component';

@Component({
  selector: 'app-workout-picker',
  templateUrl: './workout-picker.component.html',
  styleUrls: ['./workout-picker.component.scss']
})
export class WorkoutPickerComponent implements OnInit, OnDestroy {
  model: string = 'WorkoutPickerComponent';
  workoutSubscription: Subscription;
  programsSubscription: Subscription;

  workoutList: {name: string, exercises: string[]}[] = [];
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

  addOrDeleteWorkoutFromProgram(programIndex: number, programName: string) {
    const dialogConfig = {
      data: {
        question: "Nom du groupe musculaire",
        inputRequested: true,
        programIndex: this.selectedProgramIndex,
      }
    };

    this.dialog.open(ManageWorkoutToProgramDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((res: {actionAdd: boolean, workoutName: string}) => {
        // Si la popup nous renvoie une action d'AJOUT
        if (res && res.actionAdd) {
          if (res?.workoutName?.trim().length > 0) {
            // Si le groupe musculaire existe déjà on le lie au programme 
            const currentProgram: Program = this.programList.find(p => p.programIndex === programIndex);
  
            if (currentProgram && !currentProgram.workoutNames.map(w => w.toUpperCase()).includes(res.workoutName.toUpperCase())) {
              const workoutWithSameLabelExisting = this.findWorkoutWithSameSpelling(res.workoutName);
              let exerciseFromExistingWorkout = workoutWithSameLabelExisting?.exercises;
              if (workoutWithSameLabelExisting) {
                res.workoutName = workoutWithSameLabelExisting.name
              }
              this.workoutService.addWorkout(res.workoutName, exerciseFromExistingWorkout);
              this.programService.addWorkoutToProgram(res.workoutName, programIndex, programName);
            } else {
              this.snackbarService.openSnackBar('Ce groupe musculaire/cette séance existe déjà. ❌');
            }
          }
        // Si la popup nous renvoie une action de SUPPRESSION
        } else {
          if (res?.workoutName?.trim().length > 0) {
            this.programService.deleteWorkoutFromProgram(res.workoutName, this.selectedProgramIndex);
          }
        }
        
      });
  }

  findWorkoutWithSameSpelling(newWorkoutName: string): { name: string; exercises: string[]; } {
    const workoutWithSameLabel = this.workoutList.find(workout => workout.name.toUpperCase() === newWorkoutName.toUpperCase());
    if (workoutWithSameLabel) {
      return workoutWithSameLabel;
    }
    return null;
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

  selectedProgramChanged(event: MatTabChangeEvent) {
    this.programService.setProgramSelected(event.index);
    this.selectedProgramIndex = event.index;
  }
}