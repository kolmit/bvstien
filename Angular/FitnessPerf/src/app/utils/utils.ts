import { Session } from "../model/session.model";
import { Weight } from "../model/weight.model";

export class Utils {
    static isSameDay(date: Date, dateCompare: Date): boolean {
      return date.getDate() === new Date(dateCompare).getDate() 
      && date.getMonth() === new Date(dateCompare).getMonth() 
      && date.getFullYear() === new Date(dateCompare).getFullYear();
    }

    static sortSessionsByDate (sessions: Session[]): Session[] {
        return sessions.sort((a, b) => {
            return <any>new Date(a.timestamp) - <any>new Date(b.timestamp);
        });
    }

    static sortWeightsByDate (sessions: Weight[]): Weight[] { // easy refacto 
        return sessions.sort((a, b) => {
            return <any>new Date(a.date) - <any>new Date(b.date);
        });
    }
}