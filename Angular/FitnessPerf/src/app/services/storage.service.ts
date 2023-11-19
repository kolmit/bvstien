import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/compat/firestore';
import { forkJoin, Observable } from 'rxjs';
import { Session } from '../model/session.model';
import { Constants } from '../utils/constants';
import { saveAs } from 'file-saver/src/FileSaver'; 

import * as imported from '../../assets/exampleImportData.json';
import { SnackbarService } from './snackbar.service';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Weight } from '../model/weight.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends BaseService {

  importedWorkouts: any[] = (imported as any).default;
  IMPORT_DESTINATION_COLLECTION = environment.USER_DATA;

  constructor(firestore: AngularFirestore,
    private snackbarService: SnackbarService) {
      super(firestore); 
    }

  createUserRootDocument() {
    try {
      return this.firestore
      .collection(Constants.USER_DATA)
      .doc(localStorage.getItem('login'))
      .set({});
    } catch(err) {
      this.snackbarService.openSnackBar('Création du répertoire racine', err);
    }
  }

  createWeightCollection() {
    try {
      const weightModel: Weight = {
        totalWeight: -1,
        date: new Date(),
        fatWeight: -1
      }
      return this.firestore
        .collection(Constants.USER_DATA)
        .doc(localStorage.getItem('login'))
        .collection(Constants.USER_WEIGHT)
        .doc()
        .set(weightModel)
    } catch(err) {
      this.snackbarService.openSnackBar('Création de la collection weight', err);
    }
  }

  /** Méthode doublon de save(Session).
   * Permet de sauvegarder une session dans la collection "Import"
   * 
   * Exemple de fichier JSON valide pour l'importation : exampleImportData.json 
   **/
  saveImportedSession(session: Session): Promise<void> {
    return this.firestore
      .collection(this.IMPORT_DESTINATION_COLLECTION)
      .doc(localStorage.getItem('login'))
      .collection(session.workout.name)
      .doc(this.buildSessionDocumentName(session.timestamp))
      .set(session);
  }

  /** Récupère toutes les sessions de tous les muscles de l'utilisateur et les exporte en JSON. */
  fetchUserDataAndExport(): void {
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
