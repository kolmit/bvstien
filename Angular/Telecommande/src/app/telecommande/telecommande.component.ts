import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupToJavaService } from '../service/popup-to-java.service';
import { MuteVolumeComponent } from '../mute-volume/mute-volume.component';
import { Subscription } from 'rxjs';
import { ImageService } from '../service/image-service.service';

@Component({
  selector: 'app-telecommande',
  templateUrl: './telecommande.component.html',
  styleUrls: ['./telecommande.component.css']
})
export class TelecommandeComponent {

  currentMuted: boolean;
  subscription: Subscription;
  muter = new MuteVolumeComponent(this.javaService);


  constructor(
    private dialog: MatDialog, 
    private javaService: PopupToJavaService, 
    private imageService: ImageService
    ) {}

  ngOnInit() {
    this.currentMuted = false;
    this.subscription = this.muter.muted$
      .subscribe(mutedNotif => this.currentMuted = mutedNotif);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}