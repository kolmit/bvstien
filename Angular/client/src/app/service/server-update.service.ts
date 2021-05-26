import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Player } from '../model/player.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerUpdateService implements OnDestroy{
  socket: Socket;
  isMyTurn: boolean = false;
  mySymbolNumber: number;
  myPlayerName: string;
  gameStarted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  gameFinished: Subject<string> = new ReplaySubject<string>();

  boardGrid: number[][];// = [[-1, -1, -1 ], [-1, -1, -1], [-1, -1, -1]];
  playerList: Player[] = [];

  constructor() { 
    this.socket = io(environment.NODE_SERVER_URL, {
      withCredentials: true
    });     
    
    this.socket.on("connected", (myPlayerName) => {
      this.myPlayerName = myPlayerName.idPlayer
    });

    this.socket.on("tictactoe:initBoard", (boardGrid) => {
      this.boardGrid = boardGrid;
    });

    this.socket.on("tictactoe:endGame", (winner) => {
      this.gameFinished.next(winner);
    });

    this.socket.on("gameIsStarting", (symbolMessage) => {
      this.gameStarted.next(true);
      console.log("La partie va commencer ! Je suis le ", symbolMessage.symbolNumber);
      this.mySymbolNumber = symbolMessage.symbolNumber;
    });

    this.socket.on("youHaveToPlay", () => {
      this.isMyTurn = true;
    });

    this.socket.on("opponentPlayed", (msg) => {
      console.log("L'autre joueur (", msg.symbolNumber ,") a joué : ("+ msg.positionX + ";" + msg.positionY + ")");
      let opponentSymbol: number = msg.symbolNumber;
      this.boardGrid[msg.positionX][msg.positionY] = opponentSymbol;
    });

    this.socket.on('getPlayerList', (answer) => {
      console.log("player list : ", answer.playerListSent);
      this.playerList = [];
      this.playerList.push(answer.playerListSent);
    });
  }  
 
  ngOnDestroy(): void {  
    this.socket.emit('disconnecting', 'Adios amigo !'); 
    this.socket.close();
  }  

  deco(): void {  
    this.socket.close();
  }  

  readyToPlayAgain() {
     this.socket.emit('tictactoe:playagain');
  }


  public played(x: number, y:number) {
    if (this.isMyTurn){

      this.socket.emit('played', {
        positionX: x, 
        positionY: y,
        symbolNumber: this.mySymbolNumber
      }, 

      (acknowledgement) => {
        console.log(acknowledgement);
        if (acknowledgement === true){
          this.boardGrid[x][y] = this.mySymbolNumber;
          console.log(this.boardGrid[x][y]);

          this.isMyTurn = false;
        } else {
          this.isMyTurn = true;
        }
      }); 
    }
  }

  public getCell(x: number, y:number){
      return this.boardGrid[x][y];
  }

  public getBoardGrid(){
    return this.boardGrid;
  }

  public getPlayerList(){
    return this.playerList;
  }

  public getPlayerName(){
    return this.myPlayerName;
  }

  public pickName(newName: string){
    this.myPlayerName = newName;
    this.socket.emit("rename", newName);
  }

  public isItMyTurn(){
    return this.isMyTurn;
  }
}
