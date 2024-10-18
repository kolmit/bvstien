import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupImageBureauComponent } from '../popup-image-bureau/popup-image-bureau.component';

@Component({
  selector: 'app-desktop-tile',
  templateUrl: './desktop-tile.component.html',
  styleUrls: ['./desktop-tile.component.css', '../../telecommande/telecommande.component.css']
})
export class DesktopTileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchDesktop(){
    const dialogRef = this.dialog.open(PopupImageBureauComponent, {maxWidth: '90%'});
  }
}
