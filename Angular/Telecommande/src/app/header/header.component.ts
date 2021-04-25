import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() swipeLeft: string;
  @Input() swipeLeftIcon: string;
  @Input() swipeRight: string;
  @Input() swipeRightIcon: string;
  
  symbolMap: Map<string, string> = new Map();
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.symbolMap.set(this.swipeLeft, this.swipeLeftIcon);
    this.symbolMap.set(this.swipeRight, this.swipeRightIcon);
    console.log("left: ", this.swipeLeft, ":", this.swipeLeftIcon, " - right: ", this.swipeRight, ":", this.swipeLeftIcon);  
  }

  ngOnDestroy(): void {
    this.symbolMap.clear();
  }

  onSwipeLeft(){
    animateCSS('#title', this.swipeLeft ? 'slideOutLeft' : 'headShake');

    setTimeout(() => {
      if (this.swipeLeft){
        this.router.navigateByUrl('/' + this.swipeLeft);
      }
    }, 400);
   
  }

  onSwipeRight(){
    animateCSS('#title', this.swipeRight ? 'slideOutRight' : 'headShake');
    setTimeout(() => {
      if (this.swipeRight){
        this.router.navigateByUrl('/' + this.swipeRight);
      }
    }, 400);
    
  }

  headshake(){
    animateCSS('#title', 'headShake');
  }
}

export const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });