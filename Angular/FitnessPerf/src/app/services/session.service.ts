import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Session } from '../model/session.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseService {

  sessionMap: Map<string, Session[]> = new Map(); // Map mémoire (cache) entre : <nom du muscle, séances[]> 
  tonnageMap: Map<Date, number> = new Map();

  constructor(firestore: AngularFirestore) { 
    super(firestore); 
  }

  save(session: Session) {
    session.totalLifted = this.calculateTonnage(session);
    
    return this.getUserDataDocuments()
      .collection(session.workout.name)
      .doc(this.buildSessionDocumentName(session.timestamp))
      .set(session);
  }

  delete(session: Session) {
    return this.getUserDataDocuments()
      .collection(session.workout.name)
      .doc(this.buildSessionDocumentName(session.timestamp))
      .delete();
  }

  /**
   * Renvoie les séances pour le muscle passé en paramètre.
   * @param workoutName : Le muscle pour lequel on veut les séances.
   * @returns Il suffit de s'abonner à cette méthode pour recevoir les Session[].
   */
   fetchAllSessionByWorkout(workoutName: string): Observable<Session[]> {
    return this.getUserDataDocuments()
      .collection(workoutName)
      .valueChanges()
      .pipe(
        map((fetchedSessions: any[]) => {
          let sessions: Session[] = [];

          if (fetchedSessions) {
            fetchedSessions.forEach(doc => sessions.push(doc));
            sessions.forEach((session: any) => session.timestamp = session.timestamp.seconds ? Session.convertTimestampToDate(session.timestamp.seconds) : session.timestamp);
          }
          this.sessionMap.set(workoutName, sessions);
          return sessions;
        })
      );
  }

  getSessionsInMemory(workoutName: string): Session[] {
    return this.sessionMap.get(workoutName);
  }


  calculateTonnage(session: Session): number {
      let totalSession: number = 0;

      for (let exo of session.workout.exercises) {
        let totalPerExercise: number = 0;
        for (let set of exo.sets) {
          totalPerExercise = totalPerExercise + (set.repetition * set.weight)
        }
        totalSession = totalSession + totalPerExercise;
      }
      return totalSession;
    }
}