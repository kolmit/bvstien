import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ServerUpdateService } from '../service/server-update.service';

@Component({
  selector: 'app-chose-name',
  templateUrl: './chose-name.component.html',
  styleUrls: ['./chose-name.component.scss']
})
export class ChoseNameComponent {
  playerName: string;

  constructor(private serverUpdate: ServerUpdateService,
    public dialogRef: MatDialogRef<ChoseNameComponent>,) { }

  rename(){
    if (this.playerName && this.playerName.length < 16){
      this.serverUpdate.pickName(this.playerName);
      sessionStorage.setItem("playerName", this.playerName);
      this.dialogRef.close();
    }
  }

}
