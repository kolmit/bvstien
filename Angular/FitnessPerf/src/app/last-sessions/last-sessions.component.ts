import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExerciseHistoryTuple } from '../model/exercise-history-tuple.model';
import { ExerciseHistory } from '../model/exercise-history.model';
import { Session } from '../model/session.model';
import { SnackbarService } from '../services/snackbar.service';
import { StorageService } from '../services/storage.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-last-sessions',
  templateUrl: './last-sessions.component.html',
  styleUrls: ['./last-sessions.component.scss']
})
export class LastSessionsComponent implements OnInit {
  currentSessionIndex: number;
  myWorkout: string;
  allLastSessions: Session[] = [];

  maxParallelSessions: number = 3; // Nombre de séance à afficher côte à côte
  currentHistory: ExerciseHistory[] = [];

  ngOnInit(): void { }

  constructor(
    private storageService: StorageService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<LastSessionsComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { myWorkout: string }
  ) {
      this.myWorkout = data.myWorkout;
      this.getSessionHistory(this.myWorkout);
    }

  closeDialog() {
    this.dialogRef.close();
  }

  
  getSessionHistory(myWorkout: string) {
    this.storageService.streamAllSessionByWorkout(myWorkout)
    .subscribe( (allLastSessions) => {
        this.allLastSessions = Utils.sortSessionsByDate(allLastSessions);
        this.currentSessionIndex = this.allLastSessions?.length - 1;
        this.buildCurrentSessionsHistory();
      });
  }

  /** Méthode récupérant les N dernières séances, pour afficher leurs exercices (et leurs reps et charges) */
  buildCurrentSessionsHistory() {
    this.currentHistory = [];
    let parallelSessionExercisesName: string[] = [];
    const startIndex: number = this.currentSessionIndex - this.maxParallelSessions + 1;
    let parralelSessions = this.allLastSessions.slice(startIndex > 0 ? startIndex : 0, this.currentSessionIndex + 1);
    
    // On veut la liste des exo des n (= maxParallelSessions) dernières séances
    for (let i = 0 ; i < this.maxParallelSessions ; i++) {

      if (this.allLastSessions[this.currentSessionIndex - i]) {
        for (let exoToAdd of this.allLastSessions[this.currentSessionIndex - i].workout.exercises) {
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
    const sessionExist: boolean = (this.allLastSessions[index] != undefined);

    if (sessionExist) {
      this.currentSessionIndex = index;
      this.buildCurrentSessionsHistory()
    }  
    return sessionExist;
  }

  /** Pour faire disparaitre les "Avant" / "Après" */
  isSessionIndexExisting(addToIndex: number): boolean {
    return (this.allLastSessions[this.currentSessionIndex + (addToIndex*this.maxParallelSessions)] != undefined);
  }

  getTotalPageNumber() {
    return Math.round(this.allLastSessions.length / this.maxParallelSessions) + 1;
  }

  getCurrentPageNumber() {
    return Math.round((this.currentSessionIndex / this.maxParallelSessions) + 1);
  }

  deleteThisSession(indexToDelete: number){
    this.storageService.delete(this.allLastSessions[indexToDelete])
      .then(() => {
        this.snackbarService.openSnackBar("Séance supprimée.", "✔");
        this.closeDialog();
      }).catch((err) => {
        this.snackbarService.openSnackBar("Problème lors de la suppression de la séance.", err);
      });
  }
}
