import { Workout } from "./workout.model";

export class Session {
    timestamp: Date;
    workout: Workout;
    totalLifted: number

    static convertTimestampToDate(seconds: number): Date {
        return new Date(seconds*1000);
    }
}    