import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExerciseHistoryTuple } from 'src/app/model/exercise-history-tuple.model';
import { ExerciseHistory } from 'src/app/model/exercise-history.model';
import { Session } from 'src/app/model/session.model';
import { SessionService } from 'src/app/services/session.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Utils } from 'src/app/utils/utils';


@Component({
  selector: 'app-last-sessions',
  templateUrl: './last-sessions.component.html',
  styleUrls: ['./last-sessions.component.scss']
})
export class LastSessionsComponent {
  currentSessionIndex: number;
  myWorkout: string;
  workoutSessions: Session[] = [];

  maxParallelSessions: number = 3; // Nombre de séance à afficher côte à côte
  currentHistory: ExerciseHistory[] = [];

  constructor(
    private sessionService: SessionService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<LastSessionsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { myWorkout: string, allSessions: Session[] }
  ) {
      this.myWorkout = data.myWorkout;
      this.workoutSessions = Utils.sortSessionsByDate(data.allSessions);
      this.currentSessionIndex = this.workoutSessions?.length - 1;
      this.buildCurrentSessionsHistory();
    }

  closeDialog() {
    this.dialogRef.close();
  }

  /** Méthode récupérant les N dernières séances, pour afficher leurs exercices (et leurs reps et charges) */
  buildCurrentSessionsHistory() {
    this.currentHistory = [];
    let parallelSessionExercisesName: string[] = [];
    const startIndex: number = this.currentSessionIndex - this.maxParallelSessions + 1;
    let parralelSessions = this.workoutSessions.slice(startIndex > 0 ? startIndex : 0, this.currentSessionIndex + 1);
    
    // On veut la liste des exo des n (= maxParallelSessions) dernières séances
    for (let i = 0 ; i < this.maxParallelSessions ; i++) {

      if (this.workoutSessions[this.currentSessionIndex - i]) {
        for (let exoToAdd of this.workoutSessions[this.currentSessionIndex - i].workout.exercises) {
          if (parallelSessionExercisesName.findIndex(exoName => exoName === exoToAdd.name) < 0) {
            parallelSessionExercisesName.push(exoToAdd.name);
          }
        }
      }
    }

    for (let exerciseName of parallelSessionExercisesName) {
      let parallelHistoryForOneExercise: ExerciseHistoryTuple[] = [];

      // On récupère toutes les séries pour 1 exercice donné (exerciseName)
      for (let i = 0 ; i < this.maxParallelSessions ; i++) {
        if (parralelSessions[i]) {
          parallelHistoryForOneExercise[i] = {
            date: parralelSessions[i].timestamp,
            exercisesSets: parralelSessions[i].workout.exercises.find(e => e.name === exerciseName)?.sets
          }
        }
      }

      let historyForOneExercise: ExerciseHistory = {
        exerciseName: exerciseName, 
        setsHistory: parallelHistoryForOneExercise
      }

      this.currentHistory.push(historyForOneExercise);
    }
  }

  /* Change de session et renvoie si la session existe ou non */
  switchSession(addToIndex: number): boolean {
    const index = this.currentSessionIndex + (addToIndex*this.maxParallelSessions);
    const sessionExist: boolean = (this.workoutSessions[index] != undefined);

    if (sessionExist) {
      this.currentSessionIndex = index;
      this.buildCurrentSessionsHistory()
    }  
    return sessionExist;
  }

  /** Pour faire disparaitre les "Avant" / "Après" */
  isSessionIndexExisting(addToIndex: number): boolean {
    return (this.workoutSessions[this.currentSessionIndex + (addToIndex*this.maxParallelSessions)] != undefined);
  }

  getTotalPageNumber() {
    return Math.ceil(this.workoutSessions.length / this.maxParallelSessions);
  }

  getCurrentPageNumber() {
    return Math.floor(this.currentSessionIndex / this.maxParallelSessions) + 1 ;
  }
}
