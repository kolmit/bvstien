import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-popup-alttab',
  templateUrl: './popup-alttab.component.html',
  styleUrls: ['./popup-alttab.component.css']
})
export class PopupAlttabComponent implements OnInit {
  giflove = 'assets/giphy.gif';

  constructor() { }

  ngOnInit() {
  }

}
