import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-telecommande',
  templateUrl: './telecommande.component.html',
  styleUrls: ['./telecommande.component.css']
})
export class TelecommandeComponent {
  constructor(private router: Router) {}

  onSwipeLeft(){
    this.router.navigateByUrl('/desktop');
  }
}