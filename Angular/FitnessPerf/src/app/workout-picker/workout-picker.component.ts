import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from "@angular/material/legacy-tabs";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Program } from "../model/program.model";
import { MultiChoiceDialogComponent } from "../multi-choice-dialog/multi-choice-dialog.component";
import { ProgramService } from "../services/program.service";
import { SnackbarService } from "../services/snackbar.service";
import { WorkoutService } from "../services/workout.service";
import { ManageWorkoutToProgramDialogComponent } from "./partials/manage-workout-to-program-dialog/manage-workout-to-program-dialog.component";
import { StorageService } from "../services/storage.service";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { AuthService } from "../auth/auth.service";
import { FirebaseError } from "firebase/app";

@Component({
  selector: "app-workout-picker",
  templateUrl: "./workout-picker.component.html",
  styleUrls: ["./workout-picker.component.scss"],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
      })),
      state('expanded', style({
        height: '*',
        overflow: 'visible',
        opacity: '1',
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ]
})
export class WorkoutPickerComponent implements OnInit, OnDestroy {
  state = 'collapsed';

  toggleState() {
    this.state = (this.state === 'collapsed') ? 'expanded' : 'collapsed';
  }

  model: string = "WorkoutPickerComponent";

  workoutSubscription: Subscription;
  programsSubscription: Subscription;

  workoutList: { name: string; exercises: string[] }[] = [];
  programList: Program[] = [];
  selectedProgramIndex: number;
  nextSessionSuggestion: Map<string, string> = new Map(); // Map entre <ID du programme, Muscle> (Pour chaque programme, on a un muscle suggéré)

  constructor(
    private router: Router,
    private workoutService: WorkoutService,
    private programService: ProgramService,
    private snackbarService: SnackbarService,
    private storageService: StorageService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.workoutList = this.workoutService.getConfiguredWorkoutList;
    this.programList = this.programService.getConfiguredPrograms;

    this.workoutSubscription = this.workoutService
      .fetchAllWorkouts()
      .subscribe((workouts) => {
        this.workoutList = workouts;
      }, (error: FirebaseError) => {
        if (error.code === 'resource-exhausted') {
          this.snackbarService.openSnackBar(`Quotat d'utilisation dépassé... ⌛ \n${error}`);
          this.authService.logout();
        }
      });
    this.programsSubscription = this.programService
      .fetchAllPrograms()
      .subscribe((programs) => {
        this.programList = programs;
        this.selectedProgramIndex = this.programList.findIndex(p => p.selectedProgram) + 1;
      });
  }

  ngOnDestroy(): void {
    this.workoutList = [];
    this.programsSubscription?.unsubscribe();
    this.workoutSubscription?.unsubscribe();
  }

  goToExercise(forThisWorkout: string) {
    this.router.navigate(["exercises"], {
      queryParams: { workout: forThisWorkout },
    });
  }

  goToExerciseOnDateSession(event: {
    forThisWorkout: string;
    sessionDate: Date;
  }) {
    this.router.navigate(["exercises"], {
      queryParams: {
        workout: event.forThisWorkout,
        sessionDate: event.sessionDate,
      },
    });
  }

  addOrDeleteWorkoutFromProgram(programId: string) {
    const dialogConfig = {
      data: {
        question: "Nom du groupe musculaire",
        inputRequested: true,
        programIndex: this.selectedProgramIndex,
        programId: programId,
      },
    };

    this.dialog
      .open(ManageWorkoutToProgramDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((res: { actionAdd: boolean; workoutName: string }) => {
        // Si la popup nous renvoie une action d'AJOUT
        if (res && res.actionAdd) {
          if (res?.workoutName?.trim().length > 0) {
            // Si le groupe musculaire existe déjà on le lie au programme
            const currentProgram: Program = this.programList.find(
              (p) => p.id === programId
            );

            if (
              currentProgram &&
              !currentProgram.workoutNames
                .map((w) => w.toUpperCase())
                .includes(res.workoutName.toUpperCase())
            ) {
              const workoutWithSameLabelExisting =
                this.findWorkoutWithSameSpelling(res.workoutName);
              let exerciseFromExistingWorkout =
                workoutWithSameLabelExisting?.exercises;
              if (workoutWithSameLabelExisting) {
                res.workoutName = workoutWithSameLabelExisting.name;
              }
              this.workoutService.addWorkout(
                res.workoutName,
                exerciseFromExistingWorkout
              );
              this.programService.addWorkoutToProgram(
                res.workoutName,
                programId
              );
            } else {
              this.snackbarService.openSnackBar(
                "Ce groupe musculaire/cette séance existe déjà. ❌"
              );
            }
          }
          // Si la popup nous renvoie une action de SUPPRESSION
        } else {
          if (res?.workoutName?.trim().length > 0) {
            this.programService.deleteWorkoutFromProgram(
              res.workoutName,
              programId
            );
          }
        }
      });
  }

  findWorkoutWithSameSpelling(newWorkoutName: string): {
    name: string;
    exercises: string[];
  } {
    const workoutWithSameLabel = this.workoutList.find(
      (workout) => workout.name.toUpperCase() === newWorkoutName.toUpperCase()
    );
    if (workoutWithSameLabel) {
      return workoutWithSameLabel;
    }
    return null;
  }

  addProgram() {
    const dialogConfig = {
      data: {
        question: "Ajouter un programme",
        inputRequested: true,
      },
    };
    this.dialog
      .open(MultiChoiceDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((newProgramName: string) => {
        const existingProgramNames = this.programList.map((p) =>
          p.programName.toUpperCase()
        );
        if (newProgramName?.trim().length > 0) {
          if (existingProgramNames?.includes(newProgramName.toUpperCase())) {
            this.snackbarService.openSnackBar(
              "Un programme porte déjà ce nom. ❌"
            );
          }
          this.programService.saveProgram([], newProgramName);
        }
      });
  }

  deleteProgram(program: Program) {
    const dialogConfig = {
      data: {
        question: `Supprimer le programme \'${program.programName}\' ?`,
        inputRequested: false,
        choices: ["Annuler", "Supprimer"],
      },
    };
    this.dialog
      .open(MultiChoiceDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((deleteProgramAnswer: string) => {
        if (deleteProgramAnswer === dialogConfig.data.choices[1]) {
          this.programService.deleteProgram(program);
        }
      });
  }

  renameProgram(program: Program) {
    const dialogConfig = {
      data: {
        question: `Renommer le programme \'${program.programName}\' :`,
        inputRequested: true,
      },
    };
    this.dialog
      .open(MultiChoiceDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((newProgramName: string) => {
        if (newProgramName) {
          program.programName = newProgramName;
          this.programService.updateProgram(program);
        }
      });
  }

  openModalPoids() {
    this.storageService.createWeightCollection().then( () => {
      console.log('ok')
    })
  }

  setNextSessionSuggestion(suggestion: {
    programId: string;
    nextSession: string;
  }) {
    this.nextSessionSuggestion.set(suggestion.programId, suggestion.nextSession);
  }

  isNextSession(program: Program, workoutName: string) {
    return this.nextSessionSuggestion.get(program.id) === workoutName;
  }

  setDefaultProgram(program: Program) {
    if (this.programService.selectedDefaultProgram.id !== program.id) {
      this.programService.updateProgramSelectedByDefault(program);
    }
  }

  isDefaultProgram(program: Program) {
    return program.id === this.programService.selectedDefaultProgram.id;
  }

  /**
   * Utilisé par le TrackBy
   */
  identifyProgram(program: Program) {
    return program.id;
  }



}
