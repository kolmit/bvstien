import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupImageBureauComponent } from '../popup-image-bureau/popup-image-bureau.component';

@Component({
  selector: 'app-desktop-tile',
  templateUrl: './desktop-tile.component.html',
  styleUrls: ['./desktop-tile.component.css', '../../telecommande/telecommande.component.css'],
  standalone: true,
  imports: [MatDialogModule]
})
export class DesktopTileComponent {

  constructor(private dialog: MatDialog) { }

  launchDesktop(){
    this.dialog.open(PopupImageBureauComponent, {maxWidth: '90%'});
  }
}
