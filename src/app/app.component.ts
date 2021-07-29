import {Component, OnInit} from '@angular/core';
import {BooksService} from "./books.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BooksService]
})
export class AppComponent implements OnInit {
  booksArray: any = []
  hoverIndex: number = -1
  fullBookCardActive: boolean = false
  addFormActive: boolean = false
  book: object = {name: 'book'}

  constructor(private http: BooksService) {
  }

  switchFullCard(statement: boolean) {
    if (statement) document.documentElement.style.overflow = 'hidden'
    else document.documentElement.style.overflow = 'auto'
    this.fullBookCardActive = statement
  }

  switchAddForm(statement: boolean) {
    if (statement) document.documentElement.style.overflow = 'hidden'
    else document.documentElement.style.overflow = 'auto'
    this.addFormActive = statement
  }

  fillBook(book: object) {
    this.book = book
  }

  async deleteBook(id: number) {
    console.log(typeof id, id)
    try {
      await this.http.deleteBook(id)
    } catch (error) {
    } finally {
      await this.getBooks()
    }



  }

  async getBooks() {
    let kek = await this.http.getBooks()
    this.booksArray = kek.body
    console.log(kek)

  }

  async ngOnInit() {
    await this.getBooks()

  }


}
