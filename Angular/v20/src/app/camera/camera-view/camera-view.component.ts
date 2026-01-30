import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { PopupCameraComponent } from '../popup-camera/popup-camera.component';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.css'],
  standalone: true,
  imports: [HeaderComponent, PopupCameraComponent]
})
export class CameraViewComponent {
  remoteView: string = "remote";
  swipeRightIcon: string = "settings_remote";
  
  constructor() { }
}
