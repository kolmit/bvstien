import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../models/book.model';
import { SearchResult } from '../models/search.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-homepage',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  model = 'HomepageComponent';
  myCollection: Book[];
  mySearchResult: SearchResult;
  searchInProgress: boolean = false;

  constructor(private bookService: BookService) { }

  searchForm = new FormGroup({
    searchInput: new FormControl('', Validators.minLength(2))
  });

  ngOnInit() {
    this.myCollection = this.bookService.myCollection;

    this.bookService.myCollectionUpdate.subscribe((myCollection: Book[]) => {
      this.myCollection = myCollection;
    });

    if (this.bookService.lastSearch?.searchResult?.length > 0) {
      this.searchInProgress = true;
      this.mySearchResult = this.bookService.lastSearch;
      this.searchForm.setValue({ searchInput: this.bookService.lastSearch.searchInput });
    }
  }

  onSubmit() {
    const searchValue =  this.searchForm.get('searchInput').value;
    
    if (searchValue) {
      this.bookService.searchBookFromName(searchValue).subscribe((searchResult) => {
        this.mySearchResult = searchResult;
        this.searchInProgress = true;
      });
    }
  }
}