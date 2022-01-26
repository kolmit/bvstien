import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from '../model/session.model';
import { Constants } from '../utils/constants';
import { saveAs } from 'file-saver/src/FileSaver'; 

import * as imported from '../../assets/exampleImportData.json';
import { SnackbarService } from './snackbar.service';
import { WorkoutService } from './workout.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends BaseService {

  importedWorkouts: any[] = (imported as any).default;

  constructor(firestore: AngularFirestore,
    private snackbarService: SnackbarService,
    private workoutService: WorkoutService) {
      super(firestore); 
    }

  
  /** Ajoute un exercice dans la configuration de l'utilisateur */
  addUserExercise(workoutName: string, exerciseName: string){
    this.getUserDataDocuments()
      .collection(Constants.USER_EXERCISES)
      .doc(workoutName)
      .valueChanges()
      .subscribe( (res) => {
        const exerciseList: string[] = res[workoutName];

        if (!exerciseList || exerciseList.findIndex(exo => exo === exerciseName) >= 0) {
          return;
        }
        exerciseList.push(exerciseName);
        this.updateUserExercises(workoutName, exerciseList);
      });
  }

  updateUserExercises(workoutName: string, exerciseList) {
    let e: any = {[workoutName]: exerciseList};

    this.getUserDataDocuments()
      .collection(Constants.USER_EXERCISES)
      .doc(workoutName)
      .set(e);

    this.workoutService.updateConfiguredExercises(workoutName, exerciseList);
  }

  /** Supprime un exercice dans la configuration de l'utilisateur */
  deleteUserExercise(workoutName: string, exerciseName: string){
    this.getUserDataDocuments()
      .collection(Constants.USER_EXERCISES)
      .doc(workoutName)
      .valueChanges()
      .subscribe( (res) => {
        const exerciseList: string[] = res[workoutName];
        const indexToDelete = exerciseList.findIndex(exo => exo === exerciseName);

        if (indexToDelete < 0){
          return; 
        } else {
          // On met à jour la liste des exercices en mémoire
          exerciseList.splice(indexToDelete, 1);
          this.updateUserExercises(workoutName, exerciseList);
        }
      });
  }


  /** Méthode doublon de save(Session).
   * Permet de sauvegarder une session dans la collection "Import"
   * 
   * Exemple de fichier JSON valide pour l'importation : exampleImportData.json 
   **/
   saveImportedSession(session: Session) {
    return this.firestore
      .collection('Import')
      .doc(localStorage.getItem('login'))
      .collection(session.workout.name)
      .doc(this.buildSessionDocumentName(session.timestamp))
      .set(session);
  }

  /** Récupère toutes les sessions de tous les muscles de l'utilisateur et les exporte en JSON. */
  fetchUserDataAndExport() {
    // On récupère les exercices configurés :
    this.getUserDataDocuments()
      .collection(Constants.USER_EXERCISES)
      .get()
      .subscribe( (allExercises) => {

        // Pour chaque exercice, on prépare les requêtes pour récupérer les séances :
        let forkJoinArray: Observable<QuerySnapshot<DocumentData>>[] = [];
        allExercises.docs.forEach( (exo) => {
          let muscle: string = Object.keys(exo.data())[0];

          forkJoinArray.push(
            this.getUserDataDocuments()
            .collection(muscle)
            .get()
          );
        });

        let dataToExport = [];

        // ForkJoin pour que toutes les requêtes des différents muscles soient traitées en même temps
        forkJoin(forkJoinArray)
          .subscribe( (allResponse: QuerySnapshot<DocumentData>[]) => {

            allResponse.forEach(response => {
              response.docs.forEach(doc => {
                
                let session: Session = {
                  timestamp: Session.convertTimestampToDate(doc.data().timestamp.seconds),
                  workout: doc.data().workout,
                  totalLifted: doc.data().totalLifted
                };

                dataToExport.push(
                  {
                    [session.workout.name] : session
                  }
                );
              });
            });
            console.log('Export : ', dataToExport);

            var blob = new Blob([JSON.stringify(dataToExport)], {type: "text/plain;charset=utf-8"});
            const exportFileName = "Export_" + formatDate(new Date(), 'yyyy-MM-dd', 'en') + "_" + localStorage.getItem('login') + ".json";
            saveAs(blob, exportFileName);
            this.snackbarService.openSnackBar("Export réussi.")
          });
      });
  }
}
