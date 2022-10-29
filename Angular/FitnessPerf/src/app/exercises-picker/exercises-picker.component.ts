import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../model/exercise.model';
import { Workout } from '../model/workout.model';
import { Session } from '../model/session.model';
import { WorkoutService } from '../services/workout.service';
import { FormGroup, FormControl, FormBuilder, FormArray, RequiredValidator } from '@angular/forms';
import { ExerciseSet } from '../model/exercise-set.model';
import { LastSessionsComponent } from './partials/last-sessions/last-sessions.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerComponent } from './partials/date-picker/date-picker.component';
import { Utils } from '../utils/utils';
import { formatDate } from '@angular/common';
import { SnackbarService } from '../services/snackbar.service';
import { ExercisePickerDialogComponent } from './partials/exercise-picker-dialog/exercise-picker-dialog.component';
import { MultiChoiceDialogComponent } from '../multi-choice-dialog/multi-choice-dialog.component';
import { Constants } from '../utils/constants';
import { SessionService } from '../services/session.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-exercises-picker',
  templateUrl: './exercises-picker.component.html',
  styleUrls: ['./exercises-picker.component.scss']
})
export class ExercisePickerComponent implements OnInit, OnDestroy {
  model: string = 'ExercisePickerComponent';

  myWorkout: string;
  allSessions: any[] = [];
  
  currentSessionIndex: number;

  floatLabelControl = new FormControl('auto');
  workoutForm: FormGroup;
  sessionSubscription: Subscription;

  textAeraSubscription: Subscription;
  textaeraSubject: Subject<string> = new Subject<string>();
  sessionCommentary: string;

  constructor(private route: ActivatedRoute, 
    private workoutService: WorkoutService,
    private sessionService: SessionService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    // On récupère les noms d'exercices à partir du groupe musculaire sélectionné
    this.route.queryParams.subscribe( param => {
      this.myWorkout = param.workout;
      this.getSessionHistory(this.myWorkout);

      if (param.sessionDate) { // Si on vient d'une redirection du calendrier
        this.goToSession(param.sessionDate);
      }
    });

    this.textAeraSubscription = this.textaeraSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.sessionService.update({
          ...this.allSessions[this.currentSessionIndex],
          commentary: this.sessionCommentary
        });
      });
  }

  textaeraChanged(e) {
    this.textaeraSubject.next(e);
  }

  ngOnDestroy(): void {
    this.sessionSubscription ? this.sessionSubscription.unsubscribe() : null;
  }


  openSessionHistory() {
    this.dialog.open(LastSessionsComponent, {
      width: '70vh',
      height: '75vh',
      data: { 
        myWorkout : this.myWorkout,
        allSessions: this.allSessions
       }
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
    }
    this.sessionService.save(this.allSessions[this.currentSessionIndex]);
  }

  deleteSerie(exerciceIndex, serieIndex) {
    this.allSessions[this.currentSessionIndex].workout.exercises[exerciceIndex].sets.splice(serieIndex, 1);
    this.sessionService.save(this.allSessions[this.currentSessionIndex]);
  }


  isSessionExisting(date: Date): boolean {
    return (this.allSessions.findIndex((s: Session) => formatDate(s.timestamp, "dd-MM-yyyy", "en") === formatDate(date, "dd-MM-yyyy", "en")) !== -1);
  }


  getSessionHistory(myWorkout: string) {
    let sessionsFromService = this.sessionService.getSessionsByWorkout(myWorkout);

    // Si les séances ont déjà été récupérées par le service
    if (sessionsFromService !== undefined) { 
      this.sortSessionsAndInitIndex(sessionsFromService);
    }
    // On s'abonne aux changement de valeurs sur les Sessions (pour se màj à chaque submit de série, d'exo, etc...)
    this.sessionSubscription = this.sessionService.fetchAllSessionByWorkout(myWorkout)
    .subscribe((allSessionsForMyWorkout: Session[]) => {
      this.sortSessionsAndInitIndex(allSessionsForMyWorkout);
    });
  }
    

  /**
   * Sauvegarde les séances en mémoire (this.allSessions)
   * @param fetchedSessions 
   */
  sortSessionsAndInitIndex(fetchedSessions: Session[]) {
    if (fetchedSessions.length > 0) {
      this.allSessions = Utils.sortSessionsByDate(fetchedSessions);

      if (this.currentSessionIndex === undefined) {
        this.currentSessionIndex = this.allSessions?.length - 1;
      }
      this.populateForms(this.allSessions[this.currentSessionIndex]); 
    } else {
      this.allSessions = [];
      this.currentSessionIndex = 0;
    }
  }


  newSession(chosenDate: Date) {
    if (!this.isSessionExisting(chosenDate)) {
        // On récupère un objet Workout mais qui ne contient que les noms d'exo (et pas de série...)
        const myExercisesNames: string[] = this.workoutService.getConfiguredExercises(this.myWorkout);
        let myWorkoutExercisesWithSets: Exercise[] = [];
        
        // Alors on initialise les objets Exercise avec un tableau de série (vide).
        if (myExercisesNames) {
          for (let exo of myExercisesNames) {
            myWorkoutExercisesWithSets.push( {name: exo, sets: []} )
          }
        }
      
        let workout: Workout = {name: this.myWorkout, exercises: myWorkoutExercisesWithSets};
        let session: Session = {timestamp: chosenDate, workout: workout, totalLifted: 0};

        this.sessionService.save(session)
          .then(() => {
            this.currentSessionIndex = this.allSessions.findIndex(s => formatDate(s.timestamp, "dd-MM-yyyy", "en") === formatDate(chosenDate, "dd-MM-yyyy", "en"));
            this.populateForms(this.allSessions[this.currentSessionIndex])
          });
      } else {
        this.snackbarService.openSnackBar(`Une séance ${this.myWorkout} existe déjà pour le ${formatDate(chosenDate, "dd-MM-yyyy", "en")}`);
      }
  }

  goToSession(sessionDate: Date): void {
    const indexOfSessionToGo = this.allSessions.findIndex(session => 
      new Date(session.timestamp).getDate() === new Date(sessionDate).getDate() 
      && new Date(session.timestamp).getMonth() === new Date(sessionDate).getMonth() 
      && new Date(session.timestamp).getFullYear() === new Date(sessionDate).getFullYear()
    );

    if (indexOfSessionToGo >= 0) {
      const indexDifferential = (this.currentSessionIndex - indexOfSessionToGo);
      this.switchSession(-indexDifferential);
    } else {
      this.snackbarService.openSnackBar(`La séance du ${formatDate(sessionDate, "dd-MM-yyyy", "en")} n'existe pas.`, '❌');
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

  addExercise() {
    this.dialog.open(ExercisePickerDialogComponent).afterClosed()
      .subscribe((res :{exerciseName: string, addExoToConfiguration: boolean}) => 
      {
        if (res?.exerciseName) {
          let exo: Exercise = {name: res.exerciseName, sets: []}; 
          this.allSessions[this.currentSessionIndex].workout.exercises.push(exo);
          this.sessionService.save(this.allSessions[this.currentSessionIndex]);

          if (res.addExoToConfiguration) {
            this.workoutService.addUserExercise(this.myWorkout, res.exerciseName);
          }
        }
      });
  }

  deleteExercise(exerciseName: string) {
    const dialogConfig = {
      data: {
        question: "Supprimer l\'exercice\n \'" + exerciseName +"\'\npour :",
        choices: [
          'Cette séance uniquement',
          'Toutes les séances à venir'
        ]
      }
    };

    this.dialog.open(MultiChoiceDialogComponent, dialogConfig).afterClosed()
      .subscribe( (choiceSelected) => {
        let deleteIndex = this.allSessions[this.currentSessionIndex].workout.exercises.findIndex(exo => exo.name === exerciseName);

        switch(choiceSelected) {
          case dialogConfig.data.choices[0]:
            this.allSessions[this.currentSessionIndex].workout.exercises.splice(deleteIndex, 1);
            this.sessionService.save(this.allSessions[this.currentSessionIndex]);
            break;

          case dialogConfig.data.choices[1]:
            this.allSessions[this.currentSessionIndex].workout.exercises.splice(deleteIndex, 1);
            this.sessionService.save(this.allSessions[this.currentSessionIndex]);
            this.workoutService.deleteUserExercise(this.myWorkout, exerciseName)
            break;

          default: 
            break;
        }
      });
  }


  /*************************
   ********** FORM *********
   *************************/
  
  /** Crée et remplis tous les formulaires */
  populateForms(seance: Session | any){
    this.initAllForms(seance.workout);
    this.fillFormControls(seance.workout);
    this.sessionCommentary = seance.commentary;
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
        // on ajoute un formulaire de série pré-remplie pour la saisie
        if (exo.sets?.length > 0) {
          const theSerie = this.getExerciseSeries(i).at( exo.sets?.length - 1 );
          const reps = theSerie.get('repetitionCtrl');
          const weight = theSerie.get('weightCtrl');
          this.addSerieExercise(i, reps.value, weight.value, true);
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

  addSerieExercise(exerciceIndex: number, repetitionValue?: number, weightValue?: number, preFilled?: boolean) {
    let serieToAdd = this.newSerie(repetitionValue, weightValue);
    if (preFilled) {
      serieToAdd.markAsDirty();
    }

    this.getExerciseSeries(exerciceIndex).push(serieToAdd);
  }

  isPrefilled(exerciceIndex, serieIndex): boolean {
    return this.getExerciseSeries(exerciceIndex).at(serieIndex).dirty;
  }
  
  newSerie(repetitionValue?: number, weightValue?: number): FormGroup {
    return this.fb.group({
      repetitionCtrl: repetitionValue ? repetitionValue : '',
      weightCtrl: weightValue || weightValue === 0 ? weightValue : ''
    }, RequiredValidator);
  }

  isSerieEmpty(exerciceIndex, serieIndex): boolean {
    const theSerie = this.getExerciseSeries(exerciceIndex).at(serieIndex);
    return !( (theSerie.get('repetitionCtrl').value) && (theSerie.get('weightCtrl').value || theSerie.get('weightCtrl').value === 0));
  }
}