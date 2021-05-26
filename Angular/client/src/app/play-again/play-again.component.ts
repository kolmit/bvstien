import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-play-again',
  templateUrl: './play-again.component.html',
  styleUrls: ['./play-again.component.scss']
})
export class PlayAgainComponent {

  constructor (public dialogRef: MatDialogRef<PlayAgainComponent>) { }

  playAgain(playAgain: boolean){
    this.dialogRef.close(playAgain);
  }
}
