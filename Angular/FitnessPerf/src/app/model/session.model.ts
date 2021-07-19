import { Workout } from "./workout.model";

export class Session {
    timestamp: Date;
    workout: Workout;

    static convertTimestampToDate(seconds: number): Date {
        return new Date(seconds*1000);
    }
}    