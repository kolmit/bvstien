import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ChoseNameComponent } from '../chose-name/chose-name.component';
import { Player } from '../model/player.model';
import { PlayAgainComponent } from '../play-again/play-again.component';
import { ServerUpdateService } from '../service/server-update.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  playerName: string = sessionStorage.getItem("playerName");
  xArray;
  yArray;

  constructor(private serverUpdate: ServerUpdateService,
    private dialog: MatDialog) { }

  ngOnInit() {
    /** On attend que la partie commence pour que ServerUpdate recoive la grille de jeu du serveur */
    this.serverUpdate.gameStarted.subscribe(next => {
      if (next === true){
        this.xArray = Array( this.serverUpdate.boardGrid.length ).fill(-1).map((x,i)=>i);
        this.yArray = Array(this.serverUpdate.boardGrid[0].length ).fill(-1).map((x,i)=>i);
      }
    });

    /** Si la partie est gagnée par un joueur */
    this.serverUpdate.gameFinished.subscribe(winner => {
      this.dialog.open(PlayAgainComponent, {
        data: {winner}
      });
    });

    /** Si aucun nom de joueur n'est défini dans la sessionStorage, on le demande. */
    if (!this.playerName){
      this.choseName();
    } else {
      this.serverUpdate.pickName(this.playerName);
    }
  }

  changeName(nameClickedOn: Player){
    this.playerName === nameClickedOn.name ? this.choseName() : null;
  }

  choseName(){
    const dialogRef = this.dialog.open(ChoseNameComponent, {
      data: {}
    });
  }
  
  determineClass(n: number){
    let classChosen;

    switch (n) {
      case 0:
        classChosen = 'cross'
        break;
      case 1:
        classChosen = 'round'
        break;
      default:
        classChosen = 'notPlayed'
        break;
    }

    return classChosen;
  }
}
