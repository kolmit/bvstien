import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Session } from '../model/session.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore) {
   }

  /** Save une séance de sport */
  save(session: Session) {
    session.timestamp.setDate(session.timestamp.getDate() - 0);
    return this.firestore
      .collection('performanceData')
      .doc(localStorage.getItem('login'))
      .collection(session.workout.name)
      .doc(this.buildDocumentName(session.timestamp))
      .set(session);
  }

  delete(session: Session){
    return this.firestore
      .collection("performanceData")
      .doc(localStorage.getItem('login'))
      .collection(session.workout.name)
      .doc(this.buildDocumentName(session.timestamp))
      .delete();
  }

  listenToSessionChanges(session: Session) {
    return this.firestore
      .collection('performanceData')
      .doc(localStorage.getItem('login'))
      .collection(session.workout.name)
      .snapshotChanges();
  }
  
  /** Save une séance de sport */
  saveOld(session: Session){
    const documentName = this.buildDocumentName(session.timestamp);

    this.firestore
      .collection(session.workout.name)
      .doc(documentName)
      .set(session)
    .then(res => {
        console.log("Séance sauvegardée : " + documentName);
        return res;
    })
    .catch(e => {
        console.log(e);
    });
  }


  /** Récupère une séance de sport à partir de la date et du nom du muscle */
  getDocument(date: Date, workoutName: string): Observable<any> {
    const docName: string = this.buildDocumentName(date);
    return this.firestore
      .collection('performanceData')
      .doc(localStorage.getItem('login'))
      .collection(workoutName)
      .doc(docName).get();
  }
  /** Récupère une séance de sport à partir de la date et du nom du muscle */
  getDocumentOld(date: Date, workoutName: string): Observable<any> {
    const docName: string = this.buildDocumentName(date);
    return this.firestore.collection(workoutName).doc(docName).get();
  }

  /** Récupère TOUTES les séances de sport à partir du nom du muscle */
  getAllSessionByWorkout(workoutName: string): Observable<Session[]> {
    return this.firestore
    .collection('performanceData')
    .doc(localStorage.getItem('login'))
    .collection(workoutName).get()
    .pipe( 
      map((firebaseDocuments: any) => {
        let sessions: Session[] = [];
        firebaseDocuments.forEach(doc => sessions.push(doc.data()));
        sessions.forEach((session: any) => session.timestamp = Session.convertTimestampToDate(session.timestamp.seconds));
        return sessions;
      })
    )
  }


  getAllSessionByWorkoutOld(workoutName: string): Observable<Session[]> {
    return this.firestore.collection(workoutName).get()
    .pipe( 
      map((firebaseDocuments: any) => {
        let sessions: Session[] = [];
        firebaseDocuments.forEach(doc => sessions.push(doc.data()));
        sessions.forEach((session: any) => session.timestamp = Session.convertTimestampToDate(session.timestamp.seconds));
        return sessions;
      })
    )
  }


  /** Récupère la dernière séance à partir du nom du muscle  */
  getLastSessionsByWorkout(workoutName: string): Observable<Session> {

    return this.getAllSessionByWorkout(workoutName)
    .pipe( 
      map((allSessions) => this.findLastSessionBeforeToday(allSessions))
    );
  }


  /** Renvoie la dernière séance avant celle d'aujourd'hui */
  findLastSessionBeforeToday(allSessions): Session {
    let mostRecentSession: Session | any;

    allSessions.forEach((session) => {
      let mostRecentDate: Date = Session.convertTimestampToDate(mostRecentSession ? mostRecentSession.timestamp.seconds : 0);
      let thisDocDate: Date = Session.convertTimestampToDate(session.timestamp.seconds);
      let now: Date = new Date();

      if (now.getDate() != thisDocDate.getDate()) { // On ne veut pas la séance d'aujourd'hui, mais celle d'avant.
        if (thisDocDate > mostRecentDate) {
          mostRecentSession = session;
        }
      }
    });

    mostRecentSession.timestamp = Session.convertTimestampToDate(mostRecentSession.timestamp.seconds);
    return mostRecentSession;
  }


  /** Format du nom d'une séance : DD-MM-YYYY_NomDuMuscle */
  buildDocumentName(ddmmyyyy: Date | any): string {
    if (ddmmyyyy.seconds) { 
      ddmmyyyy = Session.convertTimestampToDate(ddmmyyyy.seconds);
    }

    return formatDate(ddmmyyyy, "yyyy-MM-dd", "en");
  }
}
