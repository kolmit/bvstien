import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, BehaviorSubject, forkJoin } from 'rxjs';
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
  programIndex: number;

  allWorkoutsList: Workout[] = [];
  allProgramList: Program[] = [];
  workoutSubscription: Subscription;
  programsSubscription: Subscription;

  @Output() selectedWorkoutName: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  @Input() inputWorkoutNameValue: string;

  @Input() programIndexForDeleteAction: number;

  addableWorkoutsName: string[] = [];
  deletableWorkoutsName: string[] = [];

  constructor(private workoutService: WorkoutService,
    private programService: ProgramService, 
    public dialogRef: MatDialogRef<ManageWorkoutToProgramDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {question: string, choices?: string[], inputRequested?: boolean, programIndex: number}) 
  {
    super(dialogRef, data);

    this.allWorkoutsList = this.workoutService.getConfiguredWorkoutList;
    this.allProgramList = this.programService.getConfiguredPrograms;
    this.programIndex = data.programIndex;
  }

  ngOnInit(): void {
    this.workoutService.fetchAllWorkouts().subscribe(wkts => {
      this.allWorkoutsList = wkts;
      this.getAddabledWorkouts();
      this.getDeletabledWorkouts();
    });
    this.programService.fetchAllPrograms().subscribe(pgrms => {
      this.allProgramList = pgrms;
      
      this.getDeletabledWorkouts();
      this.getAddabledWorkouts();
    });
  }

  addWorkoutTab(b: boolean) {
    this.addWorkoutTabActive = b;
  }

  
  getAddabledWorkouts() {
    let workoutAlreadyInProgram: string[] = [];
    workoutAlreadyInProgram = this.allProgramList[this.programIndex].workoutNames
    this.addableWorkoutsName = this.allWorkoutsList.filter(w => !workoutAlreadyInProgram.some(workoutNameInProgram => w.name?.toUpperCase() === workoutNameInProgram.toUpperCase()))
                                                .map(w => w.name);
    return this.addableWorkoutsName;
  }

  
  getDeletabledWorkouts() {
    this.deletableWorkoutsName = this.allProgramList[this.programIndex].workoutNames;
    return this.deletableWorkoutsName;
  }

  selectWorkout(workoutName: string) {
    // Si on clique sur un muscle sur lequel on a déjà cliqué, c'est qu'on le désélectionne.
    if (this.selectedWorkoutName.getValue() === workoutName) { 
      this.selectedWorkoutName.next(null);
    } else {
      this.selectedWorkoutName.next(workoutName);
    }
    this.inputValue = this.selectedWorkoutName.getValue();
  }

  /** 
   * Cas d'un ajout : L'utilisateur clique sur un muscle affiché -----> Le nom du muscle s'affiche dans l'<input/>
   * Si l'utilisateur modifie l'<input> (en tapant au clavier), pour faire en sorte que la classe change, 
   * on vérifie que le nom du muscle sélectionné ET la valeur de l'input soit égales.
   */
  isWorkoutStillSelected(workoutName: string) {
    return this.selectedWorkoutName.getValue() 
        && this.inputValue 
        && this.selectedWorkoutName.getValue() === workoutName;
  }

  submitChoice(actionAdd: boolean) {
    const data = {
      actionAdd: actionAdd,
      workoutName: this.selectedWorkoutName.getValue()
    };
    super.choiceSelected(data);
  }
}