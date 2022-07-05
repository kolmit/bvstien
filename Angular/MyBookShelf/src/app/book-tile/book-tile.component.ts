import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-tile',
  templateUrl: './book-tile.component.html',
  styleUrls: ['./book-tile.component.scss']
})
export class BookTileComponent {

  @Input() book: any;
  @Input() verticalTile: boolean = false; 

  constructor(private router: Router) { }

  goToDetails() {
    const selfId = this.book.id;
    this.router.navigate(['details', selfId], { state: { book: this.book } });
  }
}
