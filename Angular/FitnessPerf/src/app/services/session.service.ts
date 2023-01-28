import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { debounceTime, first, map, take } from 'rxjs/operators';

import { Session } from '../model/session.model';
import { Constants } from '../utils/constants';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseService {

  sessionMapSubject: BehaviorSubject<Map<string, Session[]>> = new BehaviorSubject(new Map()); // Map mémoire (cache) entre : <nom du muscle, séances[]> 
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

  update(session: Session) {
    this.getUserDataDocuments()
      .collection(session.workout.name)
      .doc(this.buildSessionDocumentName(session.timestamp))
      .update(session);
  }

  getSessionsByWorkout(workoutName: string): Session[] {
    return this.sessionMapSubject.getValue().get(workoutName);
  }

  prefetchAllSessions(configuredWorkouts: any[]) {
    //On requête les N muscles dans un forkjoin pour éviter d'émettre N fois une nouvelle valeur pour subject
    const sessionsByWorkout$: Observable<Session[]>[] = [];
    for (let workout of configuredWorkouts.map(w => w.name).slice(0, Constants.MAX_PREFETCH)) {
      sessionsByWorkout$.push(this.fetchAllSessionByWorkout(workout).pipe(first()));
    }
    forkJoin(sessionsByWorkout$)
      .subscribe(() => {
        this.sessionMapSubject.next(this.sessionMapSubject.getValue());
      });
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
            fetchedSessions.forEach(session => sessions.push(session));
            sessions.forEach((session: any) => session.timestamp = session.timestamp.seconds ? Session.convertTimestampToDate(session.timestamp.seconds) : session.timestamp);
          }
          this.sessionMapSubject.getValue().set(workoutName, sessions);
          return sessions;
        })
      );
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