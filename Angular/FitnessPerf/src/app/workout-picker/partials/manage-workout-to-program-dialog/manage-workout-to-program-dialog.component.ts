import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { Program } from 'src/app/model/program.model';
import { Workout } from 'src/app/model/workout.model';
import { ProgramService } from 'src/app/services/program.service';
import { WorkoutService } from 'src/app/services/workout.service';
import { MultiChoiceDialogComponent } from '../../../multi-choice-dialog/multi-choice-dialog.component';

@Component({
  selector: 'app-manage-workout-to-program-dialog',
  templateUrl: './manage-workout-to-program-dialog.component.html',
  styleUrls: ['./manage-workout-to-program-dialog.component.scss']
})
export class ManageWorkoutToProgramDialogComponent extends MultiChoiceDialogComponent implements OnInit {
  addWorkoutTabActive: boolean = true;
  programId: string;
  currentProgram: Program;

  allWorkoutsList: Workout[] = [];
  allProgramList: Program[] = [];
  workoutSubscription: Subscription;
  programsSubscription: Subscription;

  @Output() selectedWorkoutName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  @Input() inputWorkoutNameValue: string;

  addableWorkoutsName: string[] = [];
  deletableWorkoutsName: string[] = [];

  constructor(private workoutService: WorkoutService,
    private programService: ProgramService, 
    public dialogRef: MatDialogRef<ManageWorkoutToProgramDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {question: string, choices?: string[], inputRequested?: boolean, programId: string}) 
  {
    super(dialogRef, data);

    this.allWorkoutsList = this.workoutService.getConfiguredWorkoutList;
    this.allProgramList = this.programService.getConfiguredPrograms;
    this.programId = data.programId;
  }

  ngOnInit(): void {
    let obs: Observable<any>[] = [
      this.workoutService.fetchAllWorkouts().pipe(first()), 
      this.programService.fetchAllPrograms().pipe(first())
    ];

    forkJoin(obs)
    .subscribe( ([w, p])  => {
      this.allWorkoutsList = w;
      this.allProgramList = p;
      this.currentProgram = this.allProgramList.find(p => p.id === this.programId);
      this.getAddabledWorkouts();
      this.getDeletabledWorkouts();
    });
  }

  addWorkoutTab(b: boolean): void {
    this.addWorkoutTabActive = b;
    this.resetSelection();
  }
  
  /** Liste les noms des workouts ajoutables */
  getAddabledWorkouts()/*: string[]*/ {
    /*let workoutAlreadyInProgram: string[] = this.currentProgram.workoutNames;
    this.addableWorkoutsName = this.allWorkoutsList
      .filter(w => 
        !workoutAlreadyInProgram.some(workoutNameInProgram => w.name?.toUpperCase() === workoutNameInProgram.toUpperCase()
        )
      )
      .map(w => w.name);
    return this.addableWorkoutsName;*/
  }

  /** Liste les noms des workouts supprimables */
  getDeletabledWorkouts()/*: string[]*/ {
    /*this.deletableWorkoutsName = this.currentProgram.workoutNames;
    return this.deletableWorkoutsName;*/
  }

  selectWorkout(workoutName: string): void {
    // Si on clique sur un muscle sur lequel on a déjà cliqué, c'est qu'on le désélectionne.
    if (this.isWorkoutStillSelected(workoutName)) { 
      this.selectedWorkoutName.next(null);
    } else {
      this.selectedWorkoutName.next(workoutName);
    }
    this.inputValue = this.selectedWorkoutName.getValue();
  }

  resetSelection(): void {
    this.selectedWorkoutName.next(null);
    this.inputValue = this.selectedWorkoutName.getValue();
  }

  /** 
   * Cas d'un ajout : L'utilisateur clique sur un muscle affiché -----> Le nom du muscle s'affiche dans l'<input/>
   * Si l'utilisateur modifie l'<input> (en tapant au clavier), pour faire en sorte que la classe change, 
   * on vérifie que le nom du muscle sélectionné ET la valeur de l'input soit égales.
   */
  isWorkoutStillSelected(workoutName: string): boolean {
    const stillSelected = this.selectedWorkoutName.getValue() 
        && this.inputValue
        && this.inputValue === this.selectedWorkoutName.getValue()
        && this.selectedWorkoutName.getValue() === workoutName;

    return stillSelected;
  }

  submitChoice(actionAdd: boolean): void {
    const data = {
      actionAdd: actionAdd,
      workoutName: this.inputValue
    };
    super.choiceSelected(data);
  }

  getProgramName(): string {
    return this.currentProgram.programName;
  }
}