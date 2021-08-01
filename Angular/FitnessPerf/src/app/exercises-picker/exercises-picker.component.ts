import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../model/exercise.model';
import { Workout } from '../model/workout.model';
import { Session } from '../model/session.model';
import { StorageService } from '../services/storage.service';
import { WorkoutService } from '../services/workout.service';
import { FormGroup, FormControl, FormBuilder, FormArray, RequiredValidator } from '@angular/forms';
import { ExerciseSet } from '../model/exercise-set.model';
import { LastSessionsComponent } from '../last-sessions/last-sessions.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { Utils } from '../utils/utils';
import { formatDate } from '@angular/common';
import { SnackbarService } from '../services/snackbar.service';
import { ExercisePickerDialogComponent } from '../exercise-picker-dialog/exercise-picker-dialog.component';


@Component({
  selector: 'app-exercises-picker',
  templateUrl: './exercises-picker.component.html',
  styleUrls: ['./exercises-picker.component.scss']
})
export class ExercisesComponent implements OnInit {

  myWorkout: string;
  allSessions: any[] = [];
  
  currentSessionIndex: number;
  firstHistoryInit: boolean = true;

  floatLabelControl = new FormControl('auto');
  workoutForm: FormGroup;

  constructor(private route: ActivatedRoute, 
    private workoutService: WorkoutService,
    private storageService: StorageService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    // On récupère les noms d'exercices à partir du groupe musculaire sélectionné
    this.route.queryParams.subscribe( param => {
      this.myWorkout = param.workout;
      this.subscribeToSessionHistory(this.myWorkout);
    });
  }


  openSessionHistory() {
    this.dialog.open(LastSessionsComponent, {
      width: '70vh',
      height: '75vh',
      data: { myWorkout : this.myWorkout }
    });    
  }


  /** Sauvegarde une série d'un exercice */
  submitSerie(exerciceIndex, serieIndex) {
    if (this.isSerieEmpty(exerciceIndex, serieIndex)){ 
      return; 
    }
    
    const theSerie = this.getExerciseSeries(exerciceIndex).at(serieIndex);
    const reps = theSerie.get('repetitionCtrl');
    const weight = theSerie.get('weightCtrl');
    const newSerie: ExerciseSet = {repetition: reps.value, weight: weight.value};

    if (this.allSessions[this.currentSessionIndex].workout.exercises[exerciceIndex].sets[serieIndex]) { 
      this.allSessions[this.currentSessionIndex].workout.exercises[exerciceIndex].sets[serieIndex] = newSerie; // Modification d'une série
    } else { 
      this.allSessions[this.currentSessionIndex].workout.exercises[exerciceIndex].sets.push(newSerie); // Ajout d'une nouvelle 
      this.addSerieExercise(exerciceIndex);
    }
    this.storageService.save(this.allSessions[this.currentSessionIndex]);
  }


  isSessionExisting(date: Date): boolean {
    return (this.allSessions.findIndex((s: Session) => formatDate(s.timestamp, "dd-MM-yyyy", "en") === formatDate(date, "dd-MM-yyyy", "en")) !== -1);
  }


  subscribeToSessionHistory(myWorkout: string) {
    this.storageService.streamAllSessionByWorkout(myWorkout)
      .subscribe((allSessions: Session[]) => {

        if (allSessions.length > 0) {
          this.allSessions = Utils.sortSessionsByDate(allSessions);

          if (this.firstHistoryInit) {
            this.currentSessionIndex = this.allSessions?.length - 1;
            this.firstHistoryInit = false;
          }
          this.populateForms(this.allSessions[this.currentSessionIndex]); 
        } else {
          this.allSessions = [];
          this.currentSessionIndex = 0;
        }
      });
  }


  newSession(chosenDate: Date) {
    if (!this.isSessionExisting(chosenDate)) {
        // On récupère un objet Workout mais qui ne contient que les noms d'exo (et pas de série...)
        const myExercisesNames: string[] = this.workoutService.getConfiguredExercises(this.myWorkout);
        let myWorkoutExercisesWithSets: Exercise[] = [];
        
        // Alors on initialise les objets Exercise avec un tableau de série (vide).
        for (let exo of myExercisesNames) {
          myWorkoutExercisesWithSets.push( {name: exo, sets: []} )
        }
        
        let workout: Workout = {name: this.myWorkout, exercises: myWorkoutExercisesWithSets};
        let session: Session = {timestamp: chosenDate, workout: workout};

        this.storageService.save(session)
          .then(() => {
            this.currentSessionIndex = this.allSessions.findIndex(s => formatDate(s.timestamp, "dd-MM-yyyy", "en") === formatDate(chosenDate, "dd-MM-yyyy", "en"));
            this.populateForms(this.allSessions[this.currentSessionIndex])
          });
      } else {
        this.snackbarService.openSnackBar(`Une séance ${this.myWorkout} existe déjà pour le ${formatDate(chosenDate, "dd-MM-yyyy", "en")}`);
      }
  }


  switchSession(addToIndex: number): void {
    const index = this.currentSessionIndex + addToIndex;

    if (this.allSessions[index] != undefined) {
      this.currentSessionIndex = index;
      this.populateForms(this.allSessions[index]);
    }  
  }


  /** Pour faire disparaitre les "Avant" / "Après" */
  isSessionIndexExisting(addToIndex: number): boolean {
    return (this.allSessions[this.currentSessionIndex + addToIndex] != undefined);
  }

  
  pickSessionDate() {
    this.dialog.open(DatePickerComponent).afterClosed()
      .subscribe( chosenDate => {
        if (chosenDate) {
          this.newSession(chosenDate)
        }
      });
  }


  addExerciseForCurrentSession() {
    this.dialog.open(ExercisePickerDialogComponent).afterClosed()
      .subscribe( exerciseName => {
        if (exerciseName) {
          let exo: Exercise = {name: exerciseName, sets: []}; 
          this.allSessions[this.currentSessionIndex].workout.exercises.push(exo);

          this.storageService.save(this.allSessions[this.currentSessionIndex]);
        }
      });
  }

  deleteExerciseForCurrentSession(exerciseName: string, event: Event) {
    if (confirm("Voulez-vous supprimer cet exercice ?")) {
      let deleteIndex = this.allSessions[this.currentSessionIndex].workout.exercises.findIndex(exo => exo.name === exerciseName);
      this.allSessions[this.currentSessionIndex].workout.exercises.splice(deleteIndex, 1);

      this.storageService.save(this.allSessions[this.currentSessionIndex]);
    } else {
      event.stopPropagation();
    }
  }


  /*************************
   ********** FORM *********
   *************************/
  
  /** Crée et remplis tous les formulaires */
  populateForms(seance: Session | any){
    this.initAllForms(seance.workout);
    this.fillFormControls(seance.workout);
  }
  

  /** 
   * Initialise les formulaires à partir du workout (= la liste des exercices du muscle sélectionné) */
  initAllForms(myWorkout: Workout){
    // Création du formulaire pour le muscle sélectionné
    this.workoutForm = this.fb.group({
      exercisesForms: this.fb.array([])
    });

    // On crée autant de formulaire qu'il y a d'exercices
    for (let nbExo = 0 ; nbExo < myWorkout.exercises.length ; nbExo++){
      this.getExerciseForms().push(this.newExerciseForm());

      /* Si c'est un exercice pour lequel on n'a jamais saisi alors
       on ajoute une série pour pouvoir saisir directement. */
      if (!myWorkout.exercises[nbExo].sets || myWorkout.exercises[nbExo].sets.length < 1){ 
        this.addSerieExercise(nbExo);
      }
    }
  }
  
  fillFormControls(workout: Workout) {
    if (workout) {
      for (let i = 0 ; i < workout.exercises.length ; i++) {
        const exo: Exercise = workout.exercises[i];

        for (let j = 0 ; j < exo.sets?.length ; j++) {
          const serieToInject = this.newSerie(exo.sets[j].repetition, (exo.sets[j].weight));
          this.getExerciseSeries(i).push(serieToInject);
        }

        // Après avoir peuplé les séries déjà saisies, 
        // on ajoute un formulaire de série vide pour la saisie
        if (exo.sets?.length > 0) {
          this.addSerieExercise(i);
        }
      }
    }
  }

  getExerciseForms(): FormArray {
    return this.workoutForm.get('exercisesForms') as FormArray;
  }

  newExerciseForm(): FormGroup {
    return this.fb.group({
      serieForm: this.fb.array([])
    });
  }

  getExerciseSeries(exerciceIndex: number): FormArray {
    return this.getExerciseForms()
      .at(exerciceIndex)
      .get('serieForm') as FormArray;
  }

  addSerieExercise(exerciceIndex: number, repetitionValue?: number, weightValue?: number) {
    let serieToAdd = this.newSerie(repetitionValue, weightValue);
    this.getExerciseSeries(exerciceIndex).push(serieToAdd);
  }
  
  newSerie(repetitionValue?: number, weightValue?: number): FormGroup {
    return this.fb.group({
      repetitionCtrl: repetitionValue ? repetitionValue : '',
      weightCtrl: weightValue ? weightValue : ''
    }, RequiredValidator);
  }

  isSerieEmpty(exerciceIndex, serieIndex): boolean {
    const theSerie = this.getExerciseSeries(exerciceIndex).at(serieIndex);
    return !( (theSerie.get('repetitionCtrl').value) && (theSerie.get('weightCtrl').value || theSerie.get('weightCtrl').value === 0));
  }
}