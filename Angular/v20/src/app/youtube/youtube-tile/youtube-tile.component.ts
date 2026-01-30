import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PopupYoutubeComponent } from '../popup-youtube/popup-youtube.component';

@Component({
  selector: 'app-youtube-tile',
  templateUrl: './youtube-tile.component.html',
  styleUrls: ['./youtube-tile.component.css', '../../telecommande/telecommande.component.css'],
  standalone: true,
  imports: [MatDialogModule]
})
export class YoutubeTileComponent {

  constructor(private dialog: MatDialog) { }

  openYoutube(){
    this.dialog.open(PopupYoutubeComponent, {
      width: '500px',
      data: {}
    });
  }
}
