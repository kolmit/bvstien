import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss']
})
export class WallpaperComponent implements OnInit, OnDestroy {
  speed = 400;
  rangeDisplay = '1000px / 10.0s';
  imgCount: number;
  twinkleIntervals: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initializeSlider();
  }

  ngOnDestroy(): void {
    this.twinkleIntervals.forEach((interval) => clearInterval(interval));
  }

  initializeSlider(): void {
    this.imgCount = document.querySelectorAll('.img').length;

    for (let i = 1; i < 6; i++) {
      this.twinkleLoop(i);
    }
  }

  onSliderChange(event: any): void {
    const sliderValue = event.target.value;
    this.speed = 201 - sliderValue;
    this.rangeDisplay = `1000px / ${this.speed / 10}s`;

    for (let i = 1; i <= this.imgCount; i++) {
      const adjustedSpeed = this.speed * (i / 1.25);
      const imgElement = document.getElementById('img-' + i) as HTMLElement;
      imgElement.style.animationDuration = adjustedSpeed + 's';
      imgElement.style.animationName = 'float';
    }
  }

  twinkleLoop(i: number): void {
    const duration = Math.random() * 5 + 3 - (495 - this.speed) / 100;
    this.twinkle(i, duration);

    const intervalId = setTimeout(() => {
      this.twinkleLoop(i);
    }, duration * 1000);

    this.twinkleIntervals.push(intervalId);
  }

  twinkle(id: number, duration: number): void {
    const top = Math.floor(Math.random() * 85) + 0 + '%';
    const left = Math.floor(Math.random() * 85) + 0 + '%';

    const speckElement = document.getElementById('speck' + id);
    if (speckElement) {
      speckElement.remove();
    }

    const specksContainer = document.getElementById('specks');
    const newSpeck = document.createElement('div');
    newSpeck.className = 'speck';
    newSpeck.id = 'speck' + id;
    newSpeck.style.top = top;
    newSpeck.style.left = left;
    newSpeck.style.animationDuration = duration + 's';
    newSpeck.style.animationTimingFunction = 'cubic-bezier(0.250, 0.250, 0.750, 0.750)';
    newSpeck.style.animationName = 'twinkle';

    specksContainer.appendChild(newSpeck);
  }
}
