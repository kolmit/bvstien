import { Session } from "../model/session.model";

export class Utils {

    static sortSessionsByDate (sessions: Session[]): Session[] {
        return sessions.sort((a, b) => {
            return <any>new Date(a.timestamp) - <any>new Date(b.timestamp);
        });
    }
}