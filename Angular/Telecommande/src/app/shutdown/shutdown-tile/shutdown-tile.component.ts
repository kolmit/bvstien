import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PopupToJavaService } from 'src/app/service/popup-to-java.service';
import { StateService } from 'src/app/service/state.service';
import { PopupContentComponent } from '../popup-content/popup-content.component';

@Component({
  selector: 'app-shutdown-tile',
  templateUrl: './shutdown-tile.component.html',
  styleUrls: ['./shutdown-tile.component.css', '../../telecommande/telecommande.component.css']
})

export class ShutdownTileComponent {
  chosenShutdownCountdown: number;  

  constructor(private dialog: MatDialog, private stateService: StateService, private javaService: PopupToJavaService) { }

  ngOnInit() {
    
  }

 
  openShutdown(){
    const dialogRef = this.dialog.open(PopupContentComponent, {
      width: '250px',
      data: {
        radical : "shutdown", 
        shutdownCountdown : this.chosenShutdownCountdown}
    });
  }
}
