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

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  importedWorkouts: any[] = (imported as any).default;

  constructor(private firestore: AngularFirestore,
    private snackbarService: SnackbarService) { }


   getFirestore() {
    return this.firestore
      .collection(Constants.USER_DATA)
      .doc(localStorage.getItem('login'))
   }


  /** Save une séance de sport */
  save(session: Session) {
    return this.getFirestore()
      .collection(session.workout.name)
      .doc(this.buildDocumentName(session.timestamp))
      .set(session);
  }


  saveImportedSession(session: Session) {
    return this.firestore
      .collection('Import')
      .doc(localStorage.getItem('login'))
      .collection(session.workout.name)
      .doc(this.buildDocumentName(session.timestamp))
      .set(session);
  }


  delete(session: Session){
    return this.getFirestore()
      .collection(session.workout.name)
      .doc(this.buildDocumentName(session.timestamp))
      .delete();
  }


  /**
   * Renvoie les séances pour le muscle passé en paramètre.
   * @param workoutName : Le muscle pour lequel on veut les séances.
   * @returns Il suffit de s'abonner à cette méthode pour recevoir les Session[].
   */
  streamAllSessionByWorkout(workoutName: string): Observable<Session[]> {
    return this.getFirestore()
      .collection(workoutName)
      .valueChanges()
      .pipe(
        map((firebaseDocuments: any[]) => {
          let sessions: Session[] = [];
          if (firebaseDocuments) {
            firebaseDocuments.forEach(doc => sessions.push(doc));
            sessions.forEach((session: any) => session.timestamp = session.timestamp.seconds ? Session.convertTimestampToDate(session.timestamp.seconds) : session.timestamp);
          }
          return sessions;
        })
      );
  }

  
  /** Pour voir un exemple de fichier JSON valide pour l'importation : exampleImportData.json */
  importWorkout(importedJsonPath?: string) {
    console.log("Fichier lu ", this.importedWorkouts);
    for (let arrayIndex of this.importedWorkouts) {
      let session: Session = arrayIndex[Object.keys(arrayIndex)[0]];
      console.log(session);

      this.saveImportedSession(session);
    }
  }


  /** Récupère toutes les sessions de tous les muscles de l'utilisateur et les exporte en JSON. */
  fetchUserDataAndExport() {
    // On récupère les exercices configurés :
    this.firestore
      .collection(Constants.USER_DATA)
      .doc(localStorage.getItem('login'))
      .collection(Constants.USER_EXERCISES)
      .get()
      .subscribe( (allExercises) => {

        // Pour chaque exercice, on prépare les requêtes pour récupérer les séances :
        let forkJoinArray: Observable<QuerySnapshot<DocumentData>>[] = [];
        allExercises.docs.forEach( (exo) => {
          let muscle: string = Object.keys(exo.data())[0];

          forkJoinArray.push(
            this.firestore.collection(Constants.USER_DATA)
            .doc(localStorage.getItem('login'))
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
                  workout: doc.data().workout
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




  /** Format du nom d'une séance : DD-MM-YYYY_NomDuMuscle */
  buildDocumentName(ddmmyyyy: Date | any): string {
    if (ddmmyyyy.seconds) { 
      ddmmyyyy = Session.convertTimestampToDate(ddmmyyyy.seconds);
    }

    return formatDate(ddmmyyyy, "yyyy-MM-dd", "en");
  }
}
