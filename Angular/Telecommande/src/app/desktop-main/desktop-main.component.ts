import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-main',
  templateUrl: './desktop-main.component.html',
  styleUrls: ['./desktop-main.component.css']
})
export class DesktopMainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSwipeRight(){
    this.router.navigateByUrl('/');  
  }
}
