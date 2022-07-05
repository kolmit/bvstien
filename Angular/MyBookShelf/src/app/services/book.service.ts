import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, Subject } from 'rxjs';
import { Firestore, collectionData, collection, setDoc, documentId, doc } from '@angular/fire/firestore';
import { addDoc, deleteDoc, DocumentReference, onSnapshot } from 'firebase/firestore';
import { Book } from '../models/book.model';
import { SearchResult } from '../models/search.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  myCollection: Book[] = [];
  myCollectionUpdate: Subject<Book[]> = new Subject<Book[]>;
  lastSearch: SearchResult;

  constructor(private http: HttpClient, private firestore: Firestore) { 
    this.fetchMyCollection();
  }

  searchBookFromName(name?: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + name + '&maxResults=40')
      .pipe(
        map((searchResult: any) => {
          this.lastSearch = {
            searchInput: name,
            searchResult: this.mapJsonToBook(searchResult.items),
            totalItems: searchResult.totalItems
          }
          return this.lastSearch;
        })
      );
  }

  searchBookFromIsbn(isbn: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
  }

  searchBookFromSelfLink(id: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes/' + id).pipe(map((bookJson: any) => this.mapJsonToBook([bookJson])[0]));
  }

  fetchMyCollection() {
    onSnapshot(collection(this.firestore, 'bookCollectionName'), 
      (collectionUpdated) => {
        this.myCollection = [];
        collectionUpdated.docs.forEach(d => {
          this.myCollection.push(d.data() as Book);
        });
        this.myCollectionUpdate.next(this.myCollection);
      }
    );
  }

  addToCollection(book: Book) {
    if (!this.isThisBookInMyCollection(book.isbn)) {
      setDoc(doc(collection(this.firestore, 'bookCollectionName'), book.id), book);
    }
  }

  deleteFromCollection(book: Book) {
    deleteDoc(doc(collection(this.firestore, 'bookCollectionName'), book.id));
  }

  isThisBookInMyCollection(isbn: string): boolean {
    return this.myCollection.findIndex((book: Book) => book.isbn === isbn) >= 0 ;
  }

  mapJsonToBook(booksJson: any[]): Book[]{
    let books: Book[] = []
    for (let json of booksJson) {
      books.push({
        id: json.id,
        isbn: this.getIsbn(json),
        authors: json.volumeInfo.authors,
        description: json.volumeInfo.description,
        title: json.volumeInfo.title,
        thumbnail: json.volumeInfo.imageLinks ? json.volumeInfo.imageLinks.thumbnail : null
      })
    }
    return books;
  }

  getIsbn(json: any): string {
    let isbn: string;
    isbn = json.volumeInfo.industryIdentifiers?.filter((industryIdentifier: any) => industryIdentifier.type === 'ISBN_13')[0]?.identifier;
    if (isbn) return isbn;
    isbn = json.volumeInfo.industryIdentifiers?.filter((industryIdentifier: any) => industryIdentifier.type === 'ISBN_10')[0]?.identifier;
    if (isbn) return isbn;
    isbn = json.volumeInfo.industryIdentifiers ?  json.volumeInfo.industryIdentifiers[0]?.identifier : null;
    return isbn;
  }
}
