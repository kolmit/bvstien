import { Component } from '@angular/core';
import { Session } from '../model/session.model';
import { SnackbarService } from '../services/snackbar.service';
import { StorageService } from '../services/storage.service';
import { WorkoutService } from '../services/workout.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  model: string = 'ConfigurationComponent';
  profilEmail: string = localStorage.getItem('login');

  constructor(private storageService: StorageService,
    private workoutService: WorkoutService,
    private snackbarService: SnackbarService) { }

  exportSessions() {
    this.storageService.fetchUserDataAndExport();
  }
  
  importSessions(files: FileList) {
    if (!files) return;
    
    let fileReader = new FileReader();
    fileReader.readAsText(files.item(0));

    fileReader.onload = (e) => {
      let parsed = JSON.parse(fileReader.result.toString());
      let lineIndex = 0;
      let successfulImport = 0;
      let lastWorkoutName;


      for (let line of parsed) {
        lineIndex++;
        let workoutName = Object.keys(line)[0];
        let sessionData = line[workoutName];

        if (this.isMyJsonCorrect(sessionData)) {
          let session: Session = { 
            timestamp: sessionData.timestamp, 
            workout: sessionData.workout, 
            totalLifted: sessionData.totalLifted ? sessionData.totalLifted : 0,
            commentary: sessionData.commentary ? sessionData.commentary : ''
          };
          lastWorkoutName = this.shallAddToExerciseList(lastWorkoutName, session); // TODO : Exporter l'EXERCISE_LIST plutôt que de la compléter comme ça..
          this.storageService.saveImportedSession(session)
          .then(() => {
            successfulImport++;
           })
          .catch((res) => {
            this.snackbarService.openSnackBar("Erreur lors de l'importation de la séance n° " + lineIndex);
            console.error(res);
          })
          .finally(() => {
            this.snackbarService.openSnackBar("Import réussi : " + successfulImport + "/" + lineIndex + ".\n");
          });
        } else {
          this.snackbarService.openSnackBar("Erreur pour la séance n° "+ lineIndex);
        }
      }
    }
  }

  /**
   * Met à jour la liste des "userExercises"
   */
  shallAddToExerciseList(lastWorkoutName: string, session: Session) {
    /** On compare avec l'ancien muscle ajouté, pour ne pas venir écrire en base systématiquement */
    if (lastWorkoutName && session.workout.name != lastWorkoutName) {
      this.workoutService.updateUserExercises(session.workout.name, session.workout.exercises.map(e => e.name))
    }
    return session.workout.name;
  }


  isMyJsonCorrect(oneJsonSession: any) {
    let correct: boolean;
    let tmpSession: Session = {timestamp: oneJsonSession.timestamp, workout: oneJsonSession.workout, totalLifted: oneJsonSession.totalLifted };
    
    correct = (tmpSession.timestamp != undefined && tmpSession.workout != undefined);
    for (let exo of tmpSession.workout.exercises) {
      correct = (exo.name != undefined && exo.sets != undefined);
      
      for (let set of exo.sets) {
        // Soit on a un exo sans série remplie, soit les séries remplies ont les champs "repetition" et "weight"
        correct = (exo.sets.length === 0) || (set.repetition != undefined && set.weight != undefined)
      }
    }
    
    return correct;
  }
}