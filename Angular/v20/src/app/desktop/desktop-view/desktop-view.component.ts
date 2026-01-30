import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { PopupImageBureauComponent } from '../popup-image-bureau/popup-image-bureau.component';

@Component({
  selector: 'app-desktop-view',
  standalone: true,
  imports: [HeaderComponent, PopupImageBureauComponent],
  templateUrl: './desktop-view.component.html',
  styleUrl: './desktop-view.component.scss'
})
export class DesktopViewComponent {
  remoteView = 'remote';
  swipeRightIcon = 'settings_remote';
}
