import { Session } from "../model/session.model";

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
}