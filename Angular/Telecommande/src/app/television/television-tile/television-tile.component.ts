import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupRemoteTvComponent } from '../popup-remote-tv/popup-remote-tv.component';

@Component({
  selector: 'app-television-tile',
  templateUrl: './television-tile.component.html',
  styleUrls: ['./television-tile.component.css', '../../telecommande/telecommande.component.css']
})
export class TelevisionTileComponent implements OnInit {

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
  }

  
  openTv() {
    const dialogRef = this.dialog.open(PopupRemoteTvComponent, {
      data: {}
    });
  }

}
