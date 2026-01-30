import {Injectable, OnDestroy} from '@angular/core';
import {PopupToJavaService} from './popup-to-java.service';

@Injectable({
    providedIn: 'root'
})
export class StateService implements OnDestroy {
    private shutdown_active = false;
    private shutdownHourLeft = 0;
    private shutdownMinuteLeft = 0;
    private shutdownSecondLeft = 0;

    shutdownTimer: ReturnType<typeof setInterval> | null = null;

    secondsLeftBeforeShutdown = 0;


    constructor(private javaService: PopupToJavaService) {
        this.fetchShutdownState();
    }


    public fetchShutdownState() {
        this.javaService.getShutdownCount().subscribe((res: number) => {
            if (res) {
                this.shutdown_active = true;
                this.secondsLeftBeforeShutdown = res;

                this.shutdownTimer = setInterval(() => {
                    if (!this.shutdown_active && this.shutdownTimer) {
                        clearInterval(this.shutdownTimer);
                    }
                    this.secondsLeftBeforeShutdown = this.secondsLeftBeforeShutdown - 1;
                    this.setHourBeforeShutdown(Math.floor(this.secondsLeftBeforeShutdown / 3600));
                    this.setMinuteBeforeShutdown(Math.floor((this.secondsLeftBeforeShutdown % 3600) / 60));
                    this.setSecondBeforeShutdown(Math.floor((this.secondsLeftBeforeShutdown % 3600) % 60));
                }, 1000);
            }
        });
    }

    displayTimeLeft() {
        return `${this.hourBeforeShutdown}H${this.minuteBeforeShutdown}:${this.secondBeforeShutdown}`;
    }

    ngOnDestroy(): void {
        if (this.shutdownTimer) {
            clearInterval(this.shutdownTimer);
        }
    }

    public getShutdownActive(): boolean {
        return this.shutdown_active;
    }

    public setShutdownActive(active: boolean): void {
        this.shutdown_active = active;
    }

    get hourBeforeShutdown(): number {
        return this.shutdownHourLeft;
    }

    get minuteBeforeShutdown(): number {
        return this.shutdownMinuteLeft;
    }

    get secondBeforeShutdown(): number {
        return this.shutdownSecondLeft;
    }

    public setHourBeforeShutdown(hour: number): void {
        this.shutdownHourLeft = hour;
    }

    public setMinuteBeforeShutdown(minute: number): void {
        this.shutdownMinuteLeft = minute;
    }

    public setSecondBeforeShutdown(second: number): void {
        this.shutdownSecondLeft = second;
    }
}
