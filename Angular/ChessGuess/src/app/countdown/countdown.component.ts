import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnDestroy {
  @Input() countdown: number = 3;
  private subscription: Subscription | undefined;

  constructor() {
    this.subscription = interval(1000).subscribe(() => {
      this.countdown--;

      if (this.countdown === 0) {
        this.subscription?.unsubscribe();
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
