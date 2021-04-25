import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/service/image-service.service';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.css']
})
export class CameraViewComponent {
  remoteView: string = "remote";
  swipeRightIcon: string = "settings_remote";
  
  constructor() { }
}
