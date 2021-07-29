import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {BooksService} from "../books.service";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
  @Input() addFormActive: boolean = false
  @Input() formType: string = ''
  @Input() inputBook: any = {}
  @Output() randomFillBookForCreate = new EventEmitter()
  @Output() switchForm = new EventEmitter()
  @Output() getBooks = new EventEmitter()

  public formSubmit = false
  public genres: any = []

  constructor(private http: BooksService) {
  }

  close(formType: string) {
    // @ts-ignore
    this.switchForm.emit(false, formType)
    this.formSubmit = false
  }


  async createBook() {
    try {
      await this.http.createBook(this.inputBook)
    } catch (error) {
    } finally {
      await this.getBooks.emit()
      if (this.formType === 'create') {
        this.randomFillBookForCreate.emit()
      }
    }
  }

  editBook() {
    // editing
  }


  async ngOnInit() {
    let kek = await this.http.getGenres()
    this.genres = kek.body
    // this.book.author = this.randomLetter().toUpperCase() + 'Gevin Belson'
  }

}
