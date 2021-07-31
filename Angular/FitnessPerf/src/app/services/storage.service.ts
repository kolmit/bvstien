import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from '../model/session.model';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore) { }


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
            sessions.forEach((session: any) => session.timestamp = Session.convertTimestampToDate(session.timestamp.seconds));
          }
          return sessions;
        })
      );
  }


  /** Format du nom d'une séance : DD-MM-YYYY_NomDuMuscle */
  buildDocumentName(ddmmyyyy: Date | any): string {
    if (ddmmyyyy.seconds) { 
      ddmmyyyy = Session.convertTimestampToDate(ddmmyyyy.seconds);
    }

    return formatDate(ddmmyyyy, "yyyy-MM-dd", "en");
  }
}
