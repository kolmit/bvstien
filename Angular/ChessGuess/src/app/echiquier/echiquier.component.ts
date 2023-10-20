import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

declare type Case = { col: string; row: string };

@Component({
  selector: 'app-echiquier',
  templateUrl: './echiquier.component.html',
  styleUrls: ['./echiquier.component.scss'],
})
export class EchiquierComponent implements OnInit {
  columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
  nextCases: Case[] = [];
  casePointer = 0;

  countdownGameStart = 3;
  gameStarted: boolean = false;
  gameStartedClicked: boolean = false;
  gameEnded: boolean = false;

  chrono!: number;
  timestampCaseStart: Date = new Date();
  timestampCaseStop: Date = new Date();

  maxSecondToAnswer = 10;
  penality = 5;
  correctClick = 0;
  totalClick = 0;
  score = 0;

  ngOnInit(): void {
    this.generateGuess();
  }

  generateGuess(number: number = 10) {
    for (let i = 0; i < number ?? 10; i++) {
      this.computeNextCase();
    }
  }

  onClickCase(row: string, col: string): void {
    if (this.gameStarted) {
      const isCorrect =
        row === this.getNextCase()?.row && col === this.getNextCase()?.col;
      if (isCorrect) {
        this.correctClick++;
        this.endTurn();
      } else {
        this.totalClick++;
      }
      this.updateScore(
        isCorrect,
        this.timestampCaseStart,
        this.timestampCaseStop
      );
    }
  }

  startGame() {
    if (!this.gameStarted) {
      this.gameStartedClicked = true;
      this.correctClick = 0;
      this.totalClick = 0;
      this.score = 0;
      this.casePointer = 0;
      this.nextCases = [];
      this.generateGuess();

      setTimeout(() => {
        this.gameStarted = true;
        this.timestampCaseStart = new Date();
      }, this.countdownGameStart * 1000);
    } else {
      this.endGame();
      this.startGame();
    }
  }

  endGame() {
    this.gameEnded = true;
    this.gameStarted = false;
    this.gameStartedClicked = false;
  }

  computeNextCase() {
    const randomColumnIndex = Math.floor(Math.random() * this.columns.length);
    const randomRowIndex = Math.floor(Math.random() * this.rows.length);
    const x = this.columns[randomColumnIndex];
    const y = this.rows[randomRowIndex];
    this.nextCases.push({ col: x, row: y });
    console.log(this.nextCases);
  }

  getNextCase(offset?: number): Case | null {
    let tmpPointer = this.casePointer;
    if (offset) {
      tmpPointer = this.casePointer + offset;
    }
    return tmpPointer <= this.nextCases.length - 1
      ? this.nextCases[tmpPointer]
      : null;
  }

  getPieceSvg(row: string, col: string) {
    const imgCases: {
      [caseName: string]: string;
    } = {
      ['A1']: '/assets/pieces/w_rook.svg',
      ['H1']: '/assets/pieces/w_rook.svg',
      ['B1']: '/assets/pieces/w_knight.svg',
      ['G1']: '/assets/pieces/w_knight.svg',
      ['C1']: '/assets/pieces/w_bishop.svg',
      ['F1']: '/assets/pieces/w_bishop.svg',
      ['D1']: '/assets/pieces/w_queen.svg',
      ['E1']: '/assets/pieces/w_king.svg',

      ['A2']: '/assets/pieces/w_pawn.svg',
      ['H2']: '/assets/pieces/w_pawn.svg',
      ['B2']: '/assets/pieces/w_pawn.svg',
      ['G2']: '/assets/pieces/w_pawn.svg',
      ['C2']: '/assets/pieces/w_pawn.svg',
      ['F2']: '/assets/pieces/w_pawn.svg',
      ['D2']: '/assets/pieces/w_pawn.svg',
      ['E2']: '/assets/pieces/w_pawn.svg',

      ['A8']: '/assets/pieces/b_rook.svg',
      ['H8']: '/assets/pieces/b_rook.svg',
      ['B8']: '/assets/pieces/b_knight.svg',
      ['G8']: '/assets/pieces/b_knight.svg',
      ['C8']: '/assets/pieces/b_bishop.svg',
      ['F8']: '/assets/pieces/b_bishop.svg',
      ['D8']: '/assets/pieces/b_queen.svg',
      ['E8']: '/assets/pieces/b_king.svg',

      ['A7']: '/assets/pieces/b_pawn.svg',
      ['H7']: '/assets/pieces/b_pawn.svg',
      ['B7']: '/assets/pieces/b_pawn.svg',
      ['G7']: '/assets/pieces/b_pawn.svg',
      ['C7']: '/assets/pieces/b_pawn.svg',
      ['F7']: '/assets/pieces/b_pawn.svg',
      ['D7']: '/assets/pieces/b_pawn.svg',
      ['E7']: '/assets/pieces/b_pawn.svg',
    };
    const caseKey: string = col + row;
    return imgCases[caseKey];
  }

  updateScore(isCorrect: boolean, start: Date, stop: Date) {
    if (isCorrect) {
      const timeDifferenceMilliseconds = start.getTime() - stop.getTime();
      this.score += this.maxSecondToAnswer - timeDifferenceMilliseconds / 1000;
    } else {
      this.score -= this.penality;
    }
  }

  getScore() {
    return this.score.toFixed(2);
  }

  @ViewChild(ProgressBarComponent) progressBarChild!: ProgressBarComponent;
  onCountdownFinished(): void {
    this.endTurn();
  }

  endTurn() {
    this.timestampCaseStart = new Date();
    this.casePointer++;
    this.totalClick++;
    if (!this.getNextCase()) {
      this.progressBarChild.deleteCountdown();
      this.endGame();
    } else {
      this.progressBarChild.resetCountdown();
    }
  }
}
