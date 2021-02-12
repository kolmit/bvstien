import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() swipeLeft: string;
  @Input() swipeRight: string;
  
  constructor(private router: Router) {
  }

  onSwipeLeft(){
    animateCSS('#title', this.swipeLeft ? 'slideOutRight' : 'headShake');

    setTimeout(() => {
      if (this.swipeLeft){
        this.router.navigateByUrl('/' + this.swipeLeft);
      }
    }, 400);
   
  }

  onSwipeRight(){
    animateCSS('#title', this.swipeRight ? 'slideOutLeft' : 'headShake');
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