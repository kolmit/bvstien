import { Session } from 'src/app/model/session.model';


export class TimelineDay {
  date: Date;
  sessions: Session[];
  isMonthSeparator?: boolean = false;
}

export abstract class TimelineAbstractComponent {
  timelineDays: TimelineDay[] = [];

  NB_PAST_DAYS = 32;
  WEEKDAYS = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
  MONTHS = ["Jan","Fév","Mar","Avr", "Mai","Jun","Jui","Aou","Sep","Oct","Nov","Déc"];

  constructor() { 
    this.generateLastDays();
  }

  generateLastDays() {
    for (let i = 0 ; i < this.NB_PAST_DAYS ; i++) {
      const pastDate: Date = new Date();
      pastDate.setDate(new Date().getDate() - i);
      this.timelineDays.push({
        date: pastDate,
        sessions: null
      });
      // Les marqueurs de mois
      if (pastDate.getDate() === 1) {
        const monthSeparator: Date = new Date(pastDate);
        this.timelineDays.push({
          date: monthSeparator,
          sessions: null,
          isMonthSeparator: true
        });
      }
    }
  }
}