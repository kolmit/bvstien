import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../model/exercise.model';
import { Workout } from '../model/workout.model';
import { Session } from '../model/session.model';
import { StorageService } from '../services/storage.service';
import { WorkoutService } from '../services/workout.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, FormArray, RequiredValidator } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ExerciseSet } from '../model/exercise-set.model';
import { LastSessionsComponent } from '../last-sessions/last-sessions.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { Utils } from '../utils/utils';
import { formatDate } from '@angular/common';
import { SnackbarService } from '../services/snackbar.service';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-exercises-picker',
  templateUrl: './exercises-picker.component.html',
  styleUrls: ['./exercises-picker.component.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  myWorkout: string;
  myExercisesList: Exercise[] = [];
  myExercisesName: string[] = [];
  mySession: Session;
  myLastSessions: Session[];

  floatLabelControl = new FormControl('auto');
  workoutChangesSubscription: Subscription;

  currentSessionIndex: number;
  allLastSessions: Session[] = [];


  constructor(private route: ActivatedRoute, 
    private workoutService: WorkoutService,
    private storageService: StorageService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    public dialog: MatDialog) { }


  getMySessionDate() {
    const firebaseDate: any = this.mySession.timestamp; 
    return Session.convertTimestampToDate(firebaseDate.seconds);
  }


  ngOnInit(): void {
    // On récupère les noms d'exercices à partir du groupe musculaire sélectionné
    this.route.queryParams.subscribe( param => {
      this.myWorkout = param.workout;
      this.myExercisesName = this.workoutService.getExercises(this.myWorkout);
      
      // On récupère la séance du jour
      this.initMySession(new Date());
      this.getSessionHistory(this.myWorkout);
    });

  }

  ngOnDestroy(): void {
    this.workoutChangesSubscription?.unsubscribe();
  }


  initMySession(chosenDate: Date) {
    this.storageService.getDocument(chosenDate, this.myWorkout)
    .pipe(
      map(result => result.data())
    )
    .subscribe( (seance: Session | any) => {
      // Si la séance existe déjà pour ce muscle
      // alors on crée les formulaires et on les remplis avec les données renvoyées.
      if (seance) {
        this.populateForms(seance);
      } 
    });
  }

  /** Crée et remplis tous les formulaires */
  populateForms(seance: Session | any){
    this.mySession = seance;
    this.mySession.timestamp = seance.timestamp.seconds ? Session.convertTimestampToDate(seance.timestamp.seconds) : this.mySession.timestamp;
    this.initAllForms(this.mySession.workout);
    this.fillFormControls(this.mySession.workout);
  }

  pickSessionDate() {
    this.dialog.open(DatePickerComponent).afterClosed()
      .subscribe( chosenDate => {
        if (chosenDate) {
          console.log(formatDate(chosenDate, "yyyy-MM-dd", "en"))
          this.newSession(chosenDate)
        }
      });
  }

  /**
   * Crée une nouvelle séance depuis le dialog DatePickerComponent
   */
  newSession(chosenDate: Date) {
    this.isSessionExisting(chosenDate, this.myWorkout)
      .subscribe( (sessionExisting) => {
        // Si la séance n'existe pas, on la crée.
        console.log("La séance existe ? ", sessionExisting);

        if (!sessionExisting) {
          this.myExercisesName.forEach(exo => {
            const exercise: Exercise = { name: exo, sets: [ ] };
            this.myExercisesList.push( exercise );
          });

          let workout: Workout = {name: this.myWorkout, exercises: this.myExercisesList};
          let session: Session = {timestamp: chosenDate, workout: workout};

          this.storageService.save(session)
            .then(() => this.populateForms(session));

        } else {
          this.snackbarService.openSnackBar("Il existe déjà une séance " + this.myWorkout + " pour le " + formatDate(chosenDate, "dd-MM-yyyy", "en"));
        }
    });
  }


  openSessionHistory() {
    this.dialog.open(LastSessionsComponent, {
      width: '70vh',
      height: '75vh',
      data: { myWorkout : this.myWorkout }
    });    
  }


  isSerieEmpty(exerciceIndex, serieIndex): boolean {
    const theSerie = this.getExerciseSeries(exerciceIndex).at(serieIndex);
    return !( (theSerie.get('repetitionCtrl').value) && (theSerie.get('weightCtrl').value || theSerie.get('weightCtrl').value === 0));
  }


  submitSerie(exerciceIndex, serieIndex) {
    if (this.isSerieEmpty(exerciceIndex, serieIndex)){ 
      return; 
    }
    
    const theSerie = this.getExerciseSeries(exerciceIndex).at(serieIndex);
    const reps = theSerie.get('repetitionCtrl');
    const weight = theSerie.get('weightCtrl');
    const newSerie: ExerciseSet = {repetition: reps.value, weight: weight.value};

    if (this.mySession.workout.exercises[exerciceIndex].sets[serieIndex]) { 
      this.mySession.workout.exercises[exerciceIndex].sets[serieIndex] = newSerie; // Modification d'une série
    } else { 
      this.mySession.workout.exercises[exerciceIndex].sets.push(newSerie); // Ajout d'une nouvelle 
      this.addSerieExercise(exerciceIndex);
    }
    this.storageService.save(this.mySession);
  }


  fillFormControls(workout: Workout) {
    if (workout) {
      for (let i = 0 ; i < workout.exercises.length ; i++) {
        const exo: Exercise = workout.exercises[i];

        for (let j = 0 ; j < exo.sets.length ; j++) {
          const serieToInject = this.newSerie(exo.sets[j].repetition, (exo.sets[j].weight));
          this.getExerciseSeries(i).push(serieToInject);
        }

        // Après avoir peuplé les séries déjà saisies, 
        // on ajoute un formulaire de série vide pour la saisie
        if (exo.sets.length > 0) {
          this.addSerieExercise(i);
        }
      }
    }
  }

  
  isSessionExisting(date: Date, workoutName: string): Observable<boolean> {
    return this.storageService.getDocument(date, workoutName)
      .pipe(
        map(result => result.exists )
      );
  }


  getSessionHistory(myWorkout: string) {
    this.storageService.getAllSessionByWorkout(myWorkout)
    .subscribe( (allLastSessions) => {
        this.allLastSessions = Utils.sortSessionsByDate(allLastSessions);
        this.currentSessionIndex = this.allLastSessions?.length - 1;
      });
  }

  switchSession(addToIndex: number): void {
    const index = this.currentSessionIndex + addToIndex;

    if (this.allLastSessions[index] != undefined) {
      this.currentSessionIndex = index;
      this.populateForms(this.allLastSessions[index]);
    }  
  }

  /** Pour faire disparaitre les "Avant" / "Après" */
  isSessionIndexExisting(addToIndex: number): boolean {
    return (this.allLastSessions[this.currentSessionIndex + addToIndex] != undefined);
  }


  /*************************
   ********** FORM *********
   *************************/
  workoutForm: FormGroup;

  /** Initialise les formulaires à partir du workout (= la liste des exercices du muscle sélectionné) */
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
      if (myWorkout.exercises[nbExo].sets.length < 1){ 
        this.addSerieExercise(nbExo);
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
}