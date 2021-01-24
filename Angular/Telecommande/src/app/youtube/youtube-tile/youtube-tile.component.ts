import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupYoutubeComponent } from '../popup-youtube/popup-youtube.component';

@Component({
  selector: 'app-youtube-tile',
  templateUrl: './youtube-tile.component.html',
  styleUrls: ['./youtube-tile.component.css', '../../telecommande/telecommande.component.css']
})
export class YoutubeTileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openYoutube(){
    const dialogRef = this.dialog.open(PopupYoutubeComponent, {
      width: '500px',
      data: {}
    });
  }
}