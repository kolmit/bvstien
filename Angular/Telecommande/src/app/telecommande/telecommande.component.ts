import { Component } from '@angular/core';

@Component({
  selector: 'app-telecommande',
  templateUrl: './telecommande.component.html',
  styleUrls: ['./telecommande.component.css']
})

export class TelecommandeComponent {
  private desktopView: string = "desktop-view";
  private cameraView: string = "camera-view";
  
  constructor() {}
}