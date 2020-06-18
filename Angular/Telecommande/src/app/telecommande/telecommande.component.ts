import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { PopupContentComponent } from '../popup-content/popup-content.component';
import { MatDialog } from '@angular/material';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { MuteVolumeComponent } from '../mute-volume/mute-volume.component';
import { Subscription, Observable, timer, interval } from 'rxjs';
import { take, map, startWith, switchMap } from 'rxjs/operators';
import { PopupYoutubeComponent } from '../popup-youtube/popup-youtube.component';
import { PopupRemoteTvComponent } from '../popup-remote-tv/popup-remote-tv.component';
import Stomp from 'stompjs';
import * as Socket from 'socket.io-client';
import { PopupImageBureauComponent } from '../popup-image-bureau/popup-image-bureau.component';

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

  /** Stomp : la web-socket... */
  private serverUrl = 'http://192.168.1.123:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;

  constructor(
    private dialog: MatDialog, 
    private javaService: PopupToJavaService
    ) {}

  ngOnInit() {
    this.currentMuted = false;
    this.subscription = this.muter.muted$
      .subscribe(mutedNotif => this.currentMuted = mutedNotif);

      interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.javaService.getMute())
      )
      .subscribe(res => this.currentMuted = res);

      //this.initializeWebSocketConnection();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  initializeWebSocketConnection(){
    let ws = Socket(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          //$(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    //$('#input').val('');
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
    const dialogRef = this.dialog.open(PopupImageBureauComponent, {
      data: {}
    });
  }


}