import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StateService } from '../../service/state.service';
import { PopupShutdownComponent } from '../popup-shutdown/popup-shutdown.component';

@Component({
  selector: 'app-shutdown-tile',
  templateUrl: './shutdown-tile.component.html',
  styleUrls: ['./shutdown-tile.component.css', '../../telecommande/telecommande.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule]
})

export class ShutdownTileComponent {
  chosenShutdownCountdown: number | null = null;

  constructor(private dialog: MatDialog, public stateService: StateService) { }

  openShutdown(){
    this.dialog.open(PopupShutdownComponent, {
      width: '250px',
      data: {
        radical : "shutdown",
        shutdownCountdown : this.chosenShutdownCountdown}
    });
  }
}
