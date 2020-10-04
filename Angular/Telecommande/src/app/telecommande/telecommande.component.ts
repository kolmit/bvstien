import { Component } from '@angular/core';
import { PopupContentComponent } from '../popup-content/popup-content.component';
import { MatDialog } from '@angular/material';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { MuteVolumeComponent } from '../mute-volume/mute-volume.component';
import { Subscription, Observable, timer, interval } from 'rxjs';
import { take, map, startWith, switchMap } from 'rxjs/operators';
import { PopupYoutubeComponent } from '../popup-youtube/popup-youtube.component';
import { PopupRemoteTvComponent } from '../popup-remote-tv/popup-remote-tv.component';
import { PopupImageBureauComponent } from '../popup-image-bureau/popup-image-bureau.component';
import { PopupCameraComponent } from '../popup-camera/popup-camera.component';

@Component({
  selector: 'app-telecommande',
  templateUrl: './telecommande.component.html',
  styleUrls: ['./telecommande.component.css']
})
export class TelecommandeComponent {
  shutdownCountdown$: Observable<number>;
  chosenShutdownCountdown: number;
  currentMuted: boolean;
  subscription: Subscription;
  muter = new MuteVolumeComponent(this.javaService);


  constructor(
    private dialog: MatDialog, 
    private javaService: PopupToJavaService
    ) {}

  ngOnInit() {
    this.currentMuted = false;
    this.subscription = this.muter.muted$
      .subscribe(mutedNotif => this.currentMuted = mutedNotif);

      /*interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.javaService.getMute())
      )
      .subscribe(res => this.currentMuted = res);*/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  actionShutdown(){
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '250px',
      data: {
        radical : "shutdown", 
        shutdownCountdown : this.chosenShutdownCountdown}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chosenShutdownCountdown = result;
      console.log("afterClose dans la tele : " + this.chosenShutdownCountdown );
      this.shutdownCountdown$ = timer(0,1000).pipe(
        take(this.chosenShutdownCountdown),
        map(() => --this.chosenShutdownCountdown)
      );
    });
  }


  openYoutubePopup(){
    const dialogRef = this.dialog.open(PopupYoutubeComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(urlVideo => {
      if (urlVideo){
        this.javaService.getYoutubeVideo(urlVideo);
      }
    });
  }

  SwitchMute(){
    let muted = this.muter.muteDefaultOutput();
    console.log(muted);
  }

  getChaineTv(chaineTv: string){
    this.javaService.getTvChannel(chaineTv);
  }

  popupTv() {
    const dialogRef = this.dialog.open(PopupRemoteTvComponent, {
      data: {}
    });
  }

  desktop(){
    const dialogRef = this.dialog.open(PopupImageBureauComponent, {maxWidth: '90%'});
  }

  camera(){
    const dialogRef = this.dialog.open(PopupCameraComponent, {maxWidth: '90%'});
  }


}