import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  swipeLeft = input('');
  swipeLeftIcon = input('');
  swipeRight = input('');
  swipeRightIcon = input('');

  symbolMap: Map<string, string> = new Map();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.symbolMap.set(this.swipeLeft(), this.swipeLeftIcon());
    this.symbolMap.set(this.swipeRight(), this.swipeRightIcon());
  }

  ngOnDestroy(): void {
    this.symbolMap.clear();
  }

  onSwipeLeft(): void {
    void animateCSS('#title', this.swipeLeft() ? 'slideOutLeft' : 'headShake');

    setTimeout(() => {
      if (this.swipeLeft()) {
        this.router.navigateByUrl('/' + this.swipeLeft());
      }
    }, 400);
  }

  onSwipeRight(): void {
    void animateCSS('#title', this.swipeRight() ? 'slideOutRight' : 'headShake');
    setTimeout(() => {
      if (this.swipeRight()) {
        this.router.navigateByUrl('/' + this.swipeRight());
      }
    }, 400);
  }

  headshake(): void {
    void animateCSS('#title', 'headShake');
  }
}

export const animateCSS = (element: string, animation: string, prefix = 'animate__') =>
  new Promise<void>((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector<HTMLElement>(element);

    if (!node) {
      resolve();
      return;
    }

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event: AnimationEvent) {
      event.stopPropagation();
      resolve();
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
