import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getGenres() {
    return this.http.get('/genre', {observe: 'response'}).toPromise()
  }

  createBook(book: any) {
    return this.http.post('/books', book, {observe: 'response'}).toPromise()
  }

 getBooks() {
    return this.http.get('/books', {observe: 'response'}).toPromise();
  }

  deleteBook(id: number) {
    return this.http.delete('books/' + id, {observe: 'response'}).toPromise()
  }
}
