import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  model: string = 'BookDetailComponent';
  book;
  bookIsbn: string;

  constructor(private router: Router, private bookService: BookService) {
    if (!this.router.getCurrentNavigation()?.extras.state) { // Si c'est un refresh de la page
      const selfId = this.router.url.split('/')[2];
      this.bookService.searchBookFromSelfLink(selfId).subscribe((bookJson) => {
        this.book = bookJson;
      });
    } else { // Si on vient d'une navigation par Router
      this.book = this.router.getCurrentNavigation()?.extras?.state?.['book'];
    }
  }

  addToCollection() {
    let bookDto: Book = {
      id: this.book.id,
      title: this.book.title,
      authors: this.book.authors,
      description: this.book.description ? this.book.description : 'Pas de description.',
      thumbnail: this.book.thumbnail ? this.book.thumbnail : this.book.smallThumbnail ? this.book.smallThumbnail : '',
      isbn: this.book.isbn,
    }
    this.bookService.addToCollection(bookDto);
  }

  deleteFromCollection() {
    this.bookService.deleteFromCollection(this.book);
  }

  isThisBookInMyCollection(isbn: string) {
    return this.bookService.isThisBookInMyCollection(isbn);
  }
}
