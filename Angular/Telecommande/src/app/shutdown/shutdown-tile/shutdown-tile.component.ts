import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupToJavaService } from 'src/app/service/popup-to-java.service';
import { StateService } from 'src/app/service/state.service';
import { PopupShutdownComponent } from '../popup-shutdown/popup-shutdown.component';

@Component({
  selector: 'app-shutdown-tile',
  templateUrl: './shutdown-tile.component.html',
  styleUrls: ['./shutdown-tile.component.css', '../../telecommande/telecommande.component.css']
})

export class ShutdownTileComponent {
  chosenShutdownCountdown: number;  

  constructor(private dialog: MatDialog, public stateService: StateService, private javaService: PopupToJavaService) { }

  ngOnInit() {
  }

 
  openShutdown(){
    const dialogRef = this.dialog.open(PopupShutdownComponent, {
      width: '250px',
      data: {
        radical : "shutdown", 
        shutdownCountdown : this.chosenShutdownCountdown}
    });
  }
}
