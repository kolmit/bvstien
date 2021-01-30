import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupToJavaService } from '../service/popup-to-java.service';
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


  constructor(
    private dialog: MatDialog, 
    private javaService: PopupToJavaService, 
    private imageService: ImageService
    ) {}

  ngOnInit() {
    this.currentMuted = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}