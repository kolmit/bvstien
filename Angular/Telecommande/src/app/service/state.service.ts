import { Injectable, OnDestroy } from '@angular/core';
import { PopupToJavaService } from './popup-to-java.service';

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnDestroy{
  private shutdown_active: boolean;
  private shutdownHourLeft: number;
  private shutdownMinuteLeft: number;
  private shutdownSecondLeft: number;

  shutdownTimer;

  secondsLeftBeforeShutdown: number;

  
  constructor(private javaService: PopupToJavaService) {
    this.fetchShutdownState();
  }


  public fetchShutdownState() {

      this.javaService.getShutdownCount().subscribe((res: number) => {
        if (res) {
          this.shutdown_active = true;
          this.secondsLeftBeforeShutdown = res;
          
          this.shutdownTimer = setInterval( () => {
            if (!this.shutdown_active) {
              clearTimeout(this.shutdownTimer);
            }
            this.secondsLeftBeforeShutdown = this.secondsLeftBeforeShutdown - 1;
            this.setHourBeforeShutdown(Math.floor(this.secondsLeftBeforeShutdown/3600));
            this.setMinuteBeforeShutdown(Math.floor((this.secondsLeftBeforeShutdown%3600)/60));
            this.setSecondBeforeShutdown(Math.floor((this.secondsLeftBeforeShutdown%3600)%60));
          }, 1000);
        }
      });
  }
   
  ngOnDestroy(): void {
    clearTimeout(this.shutdownTimer);
  }

  public getShutdownActive(): boolean{
    return this.shutdown_active;
  }

  public setShutdownActive(active: boolean): void{
    this.shutdown_active = active;
  }
  
  public getHourBeforeShutdown(): number{
    return this.shutdownHourLeft;
  }

  public getMinuteBeforeShutdown(): number{
    return this.shutdownMinuteLeft;
  }

  public getSecondBeforeShutdown(): number{
    return this.shutdownSecondLeft;
  }

  public setHourBeforeShutdown(hour: number): void{
    this.shutdownHourLeft = hour;
  }

  public setMinuteBeforeShutdown(minute: number): void{
    this.shutdownMinuteLeft = minute;
  }

  public setSecondBeforeShutdown(second: number): void{
    this.shutdownSecondLeft = second;
  }
}
