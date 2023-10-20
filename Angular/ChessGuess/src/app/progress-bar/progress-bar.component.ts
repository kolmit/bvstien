import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnChanges {
  interval: any;
  private progressInitialValue = 100;
  progressTick = 1;
  progressTickRate = 1000 / 10; // 1000ms/4 pour un tickrate de 250ms
  @Input() progress: number = 100;
  @Input() maxSecondToAnswer: number = 15;
  @Output() countdownFinished: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.startProgress();
  }

  startProgress(): void {
    this.interval = setInterval(() => {
      this.progress -= this.progressTick / (1000 / this.progressTickRate);
      if (this.progress === 0) {
        clearInterval(this.interval);
        this.countdownFinished.emit();
      }
    }, this.progressTickRate);
  }

  ngOnChanges(changes: any): void {
    if (changes?.maxSecondToAnswer?.currentValue) {
      this.maxSecondToAnswer = changes?.maxSecondToAnswer?.currentValue;
      this.progressTick = this.progressInitialValue / this.maxSecondToAnswer;
    }
  }

  resetCountdown() {
    clearInterval(this.interval);
    this.progress = this.progressInitialValue;
    this.startProgress();
  }

  deleteCountdown() {
    clearInterval(this.interval);
  }
}
