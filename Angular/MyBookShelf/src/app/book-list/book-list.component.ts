import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  model: string = 'BookListComponent';

  searchResult: any[] = [];
  searchValue: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.searchResult = this.bookService.lastSearch.searchResult;
  }

  identifyBook(index: any, item: any) {
    return item.id;
  }

  searchBookFromName(searchValue: string) {
    this.bookService.searchBookFromName(searchValue).subscribe((result) => {
      console.log(result);
      this.searchResult = result
    });
  }

  submitSearch(){
    this.searchBookFromName(this.searchValue)
  }

}
