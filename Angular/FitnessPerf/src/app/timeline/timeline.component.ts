import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Program } from '../model/program.model';
import { Session } from '../model/session.model';
import { ProgramService } from '../services/program.service';
import { SessionService } from '../services/session.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input()
  program: Program;

  @Output()
  goToSession: EventEmitter<{forThisWorkout: string, sessionDate: Date}> = new EventEmitter();

  @Output()
  nextSessionSuggestion: EventEmitter<{program: Program, nextSession: string}> = new EventEmitter();

  NB_PAST_DAYS = 32;
  WEEKDAYS = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
  MONTHS = ["Jan","Fév","Mar","Mai","Jun","Jui","Aou","Sep","Oct","Nov","Déc"];

  sessionsOfThisProgram: Map<string, Session[]> = new Map();
  timelineDays: TimelineDay[] = [];
  
  constructor(
    private programService: ProgramService, 
    private sessionService: SessionService
  ) { }


  ngOnInit(): void {
    this.generateLastDays();

    this.sessionService.sessionMapSubject
      .subscribe(() => {
        // On cherche les jours pour lesquels on a des séances
        this.sessionsOfThisProgram = this.programService.getSessionsByProgram(this.program);
        for (let sessions of this.sessionsOfThisProgram.values()){
          if (sessions) {
            for (let session of sessions) {
              let dayWithSession = this.timelineDays.find(
                day => day.date.getDate() === new Date(session.timestamp).getDate() 
                && day.date.getMonth() === new Date(session.timestamp).getMonth() 
                && day.date.getFullYear() === new Date(session.timestamp).getFullYear()
              );

              if (dayWithSession) dayWithSession.session = session;
            }
            this.nextSessionSuggestion.emit({
              program:this.program, 
              nextSession: this.computeNextSessionSuggestion(this.sessionsOfThisProgram)
            });
          }
        }
      });
  }

  generateLastDays() {
    for (let i = 0 ; i < this.NB_PAST_DAYS ; i++) {
      const pastDate: Date = new Date();
      pastDate.setDate(new Date().getDate() - i);
      this.timelineDays.push({
        date: pastDate,
        session: null
      });
      // Les marqueurs de mois
      if (pastDate.getDate() === 1) {
        const monthSeparator: Date = new Date();
        monthSeparator.setMonth(monthSeparator.getMonth() - 1);
        this.timelineDays.push({
          date: monthSeparator,
          session: null,
          isMonthSeparator: true
        });
      }
    }
  }

  computeNextSessionSuggestion(sessionsOfThisProgram: Map<string, Session[]>): string {
    let mostRecentSessions: Session[] = [];
    for (let entry of sessionsOfThisProgram.entries()) {
      if (!entry[1]?.length) { // Si y'a pas de séance pour un muscle, il doit être suggéré
        return entry[0];
      }
      const lastSessionForThisWorkout = Utils.sortSessionsByDate(entry[1])[entry[1].length - 1];
      mostRecentSessions.push(lastSessionForThisWorkout);
    }
    // Sinon on va chercher le muscle qui a été travaille le plus anciennement
    mostRecentSessions = Utils.sortSessionsByDate(mostRecentSessions);
    return mostRecentSessions[0]?.workout.name;
  }

  emitGoToSession(day: TimelineDay) {
    if (day.session) {
      this.goToSession.emit({
        forThisWorkout: day.session.workout.name,
        sessionDate: day.date,
      });
    }
  }
}

class TimelineDay {
  date: Date;
  session: Session;
  isMonthSeparator?: boolean = false;
}