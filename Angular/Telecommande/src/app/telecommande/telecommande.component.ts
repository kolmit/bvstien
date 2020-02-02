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
  usersUrl: string;

  constructor(public dialog: MatDialog/*, private http: HttpClient*/) {
    /*this.usersUrl = 'http://localhost:8080/users';*/
   }

  ngOnInit() {
  }


  actionShutdown(){
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '250px',
      data: {radical : "shutdown" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  actionVolume(){
    const dialogRef = this.dialog.open(PopupContentVolumeComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}