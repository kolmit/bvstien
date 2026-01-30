import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupRemoteTvComponent } from '../popup-remote-tv/popup-remote-tv.component';

@Component({
  selector: 'app-television-tile',
  templateUrl: './television-tile.component.html',
  styleUrls: ['./television-tile.component.css', '../../telecommande/telecommande.component.css'],
  standalone: true,
  imports: [MatDialogModule]
})
export class TelevisionTileComponent {

  constructor(private dialog: MatDialog) {}

  openTv() {
    this.dialog.open(PopupRemoteTvComponent, {
      data: {}
    });
  }

}
