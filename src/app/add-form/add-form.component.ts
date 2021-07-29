import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {BooksService} from "../books.service";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  @Input() addFormActive: boolean = false
  @Output() switchAddForm = new EventEmitter()
  @Output() getBooks = new EventEmitter()

  public book: any = {
    name: 'Book ' + String(Math.floor(Math.random() * 1000)),
    author: 'Gevin Belson',
    date: 1969,
    genreIds: [1],
    description: ''
  }
  public formSubmit = false
  public genres: any = []
  public submitMessage = ''

  constructor(private http: BooksService) {
  }

  close() {
    this.switchAddForm.emit(false)
    this.formSubmit = false
  }

  async createBook() {
    try {
      await this.http.createBook(this.book)
    } catch (error) {
    } finally {
      await this.getBooks.emit()
      this.book.name = 'Book ' + String(Math.floor(Math.random() * 1000))
      this.formSubmit = true
    }

  }

  async ngOnInit() {
    let kek = await this.http.getGenres()
    this.genres = kek.body
  }

}
