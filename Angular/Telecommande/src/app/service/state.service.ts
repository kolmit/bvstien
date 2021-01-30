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

  
  constructor(private javaService: PopupToJavaService) {
    this.fetchShutdownState();
   }

  private fetchShutdownState() {
    if (!this.shutdownTimer){
      this.shutdownTimer = setInterval( () => {

        this.javaService.getShutdownCount().subscribe((res) => {
          if (res){
            this.shutdown_active = true;
            let timerLeftBeforeShutdown = new Date(res);
            this.setHourBeforeShutdown(timerLeftBeforeShutdown.getHours());
            this.setMinuteBeforeShutdown(timerLeftBeforeShutdown.getMinutes());
            this.setSecondBeforeShutdown(timerLeftBeforeShutdown.getSeconds());
          }
          
        });

      }, 1000);
    }
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
