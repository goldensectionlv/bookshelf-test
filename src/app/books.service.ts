import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getGenres() {
    return this.http.get('/genre', {observe: 'response'})
  }

  createBook(book: any) {
    return this.http.post('/books', book, {observe: 'response'})
  }
}
