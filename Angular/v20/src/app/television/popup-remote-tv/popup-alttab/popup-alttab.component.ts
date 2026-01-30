import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-alttab',
  templateUrl: './popup-alttab.component.html',
  styleUrls: ['./popup-alttab.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PopupAlttabComponent {
  giflove = 'assets/giphy.gif';

  constructor() { }

}
