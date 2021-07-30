import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {BooksService} from "../books.service";
import {EmailValidator} from "@angular/forms";

@Component({
  selector: 'app-add-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
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
      if (this.formType === 'create') this.randomFillBookForCreate.emit()
      this.formSubmit = true
    }
  }

  async editBook() {
    // editing
    console.log(this.inputBook)
    try {
      await this.http.updateBook(this.inputBook)
    } catch (error) {
    } finally {
      await this.getBooks.emit()
      this.formSubmit = true
    }

  }


  async ngOnInit() {
    let kek = await this.http.getGenres()
    this.genres = kek.body
    // this.book.author = this.randomLetter().toUpperCase() + 'Gevin Belson'
  }

}
