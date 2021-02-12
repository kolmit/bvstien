import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-view',
  templateUrl: './desktop-view.component.html',
  styleUrls: ['./desktop-view.component.css']
})
export class DesktopViewComponent {
  private remoteView: string = 'remote';
  
  constructor(private router: Router) { }
}
