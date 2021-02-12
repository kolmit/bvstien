import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.css']
})
export class CameraViewComponent {
  private remoteView: string = "remote";
  
  constructor(private router: Router) { }

  onSwipeLeft(){
    this.router.navigateByUrl('/' + this.remoteView);  
  }
}
