import { Component, OnInit } from '@angular/core';
import { PopupContentComponent } from '../popup-content/popup-content.component';
import { MatDialog } from '@angular/material';
import { PopupContentVolumeComponent } from '../popup-content-volume/popup-content-volume.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-telecommande',
  templateUrl: './telecommande.component.html',
  styleUrls: ['./telecommande.component.css']
})
export class TelecommandeComponent implements OnInit {
  shutdownCountdown: number;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
  }


  actionShutdown(){
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '250px',
      data: {
        radical : "shutdown", 
        shutdownCountdown : this.shutdownCountdown}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.shutdownCountdown = result;
      
    });
  }


}