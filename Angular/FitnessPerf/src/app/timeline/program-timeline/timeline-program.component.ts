import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Program } from '../../model/program.model';
import { Session } from '../../model/session.model';
import { ProgramService } from '../../services/program.service';
import { SessionService } from '../../services/session.service';
import { Utils } from '../../utils/utils';
import {
  TimelineAbstractComponent,
  TimelineDay
} from '../timeline-abstract/timeline-abstract.component';

@Component({
  selector: 'app-timeline-program',
  templateUrl: './timeline-program.component.html',
  styleUrls: ['./timeline-program.component.scss']
})
export class TimelineProgramComponent
  extends TimelineAbstractComponent
  implements OnInit, OnDestroy
{
  @Input()
  program: Program;

  @Output()
  goToSession: EventEmitter<{ forThisWorkout: string; sessionDate: Date }> = new EventEmitter();

  @Output()
  nextSessionSuggestion: EventEmitter<{ programId: string; nextSession: string }> =
    new EventEmitter();

  sessionsOfThisProgram: Map<string, Session[]> = new Map();
  sessionMapSubscription: Subscription;

  constructor(
    private programService: ProgramService,
    private sessionService: SessionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.sessionMapSubscription = this.sessionService.sessionMapSubject.subscribe(() => {
      this.sessionsOfThisProgram = this.programService.getSessionsByProgram(this.program);

      for (let sessions of this.sessionsOfThisProgram.values()) {
        if (sessions) {
          for (let session of sessions) {
            // On cherche les jours de la timeline pour lesquels on a des séances
            let dayWithSession: TimelineDay = this.timelineDays.find((day) =>
              Utils.isSameDay(day.date, session.timestamp)
            );

            // On regarde que cette séance n'existe pas déjà au sein de la timeline (plusieurs trigger de sessionMapSubject)
            let existing = this.timelineDays.filter((timelineDay) => {
              let sessionExisting = timelineDay.sessions?.filter(
                (s) =>
                  s.workout.name === session.workout.name &&
                  Utils.isSameDay(s.timestamp, session.timestamp)
              ).length;
              return sessionExisting;
            });

            if (!existing.length && dayWithSession) {
              if (!dayWithSession.sessions) {
                dayWithSession.sessions = [];
              }
              dayWithSession.sessions.push(session);
            }
          }
        }
      }

      this.nextSessionSuggestion.emit({
        programId: this.program.id,
        nextSession: this.computeNextSessionSuggestion(this.sessionsOfThisProgram)
      });
    });
  }

  ngOnDestroy() {
    this.sessionMapSubscription.unsubscribe();
  }

  computeNextSessionSuggestion(sessionsOfThisProgram: Map<string, Session[]>): string {
    let mostRecentSessions: Session[] = [];
    for (let entry of sessionsOfThisProgram.entries()) {
      if (!entry[1]?.length) {
        // Si y'a pas de séance pour un muscle, il doit être suggéré
        return entry[0];
      }
      const lastSessionForThisWorkout = Utils.sortSessionsByDate(entry[1])[entry[1].length - 1];
      mostRecentSessions.push(lastSessionForThisWorkout);
    }
    // Sinon on va chercher le muscle qui a été travaille le plus anciennement
    mostRecentSessions = Utils.sortSessionsByDate(mostRecentSessions);
    return mostRecentSessions[0]?.workout.name;
  }

  emitGoToSession(day: TimelineDay, menuItemIndex = 0) {
    if (day.sessions) {
      this.goToSession.emit({
        forThisWorkout: day.sessions[menuItemIndex].workout.name,
        sessionDate: day.date
      });
    }
  }
}
