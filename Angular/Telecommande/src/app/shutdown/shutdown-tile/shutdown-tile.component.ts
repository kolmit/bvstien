import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PopupContentComponent } from '../popup-content/popup-content.component';

@Component({
  selector: 'app-shutdown-tile',
  templateUrl: './shutdown-tile.component.html',
  styleUrls: ['./shutdown-tile.component.css', '../../telecommande/telecommande.component.css']
})

export class ShutdownTileComponent implements OnInit {
  shutdownCountdown$: Observable<number>;
  chosenShutdownCountdown: number;
  
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openShutdown(){
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '250px',
      data: {
        radical : "shutdown", 
        shutdownCountdown : this.chosenShutdownCountdown}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chosenShutdownCountdown = result;

      this.shutdownCountdown$ = timer(0,1000).pipe(
        take(this.chosenShutdownCountdown),
        map(() => --this.chosenShutdownCountdown)
      );
    });
  }
}
