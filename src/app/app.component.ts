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

  addFormActive: boolean = false
  book: any
  activeFilter = 'По названию'

  fullBookActive: boolean = false

  pageNumber = 0
  size = 10
  pageCount = []
  currentPageArray: any = []

  public alphabet = "abcdefghijklmnopqrstuvwxyz"

  constructor(private http: BooksService) {
  }

  switchForm(statement: boolean, formType: string) {
    console.log(formType)
    if (statement) document.documentElement.style.overflow = 'hidden'
    else document.documentElement.style.overflow = 'auto'
    if (formType === 'create') this.addFormActive = statement
    else if (formType === 'patch') this.fullBookActive = statement

  }

  paginatedData(pageNumber: number) {
    this.currentPageArray = []
    // @ts-ignore
    this.pageCount = Array(Math.ceil(this.booksArray.length / this.size)).fill().map((x: any,i: any) => i)
    this.pageNumber = pageNumber
    let start = pageNumber * this.size
    let end = start + this.size
    this.currentPageArray = this.booksArray.slice(start, end)

    console.log(this.pageCount)
  }
  randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
  }

  randomLetter() {
    return this.alphabet[Math.floor(Math.random() * this.alphabet.length)]
  }


  fillBook(book: any, formType: string) {
    this.book = {}
    if (formType === 'patch') {
      this.book = {
        id: book.id,
        name: book.name,
        author: book.author,
        date: book.date,
        genreIds: book.genre.map((i: any) => i.id),
        description: book.description
      }
    } else {
      this.book = {
        name: this.randomLetter().toUpperCase() + ' Book ' + String(this.randomInt(0, 1000)),
        author: this.randomLetter().toUpperCase() + ' Gevin Belson',
        date: this.randomInt(1969, 2021),
        genreIds: [this.randomInt(1, 7)],
        description: 'Стандартное описание, чтобы не вводить руками'
      }
    }
  }

  filter_by(byWhat: string) {
    if (byWhat === 'По году') this.booksArray.sort((a: any, b: any) => b.date - a.date)
    else if (byWhat === 'По автору') this.booksArray.sort((a: any, b: any) => a.author.localeCompare(b.author));
    else if (byWhat === 'По жанру') this.booksArray.sort((a: any, b: any) => a.genre[0].name.localeCompare(b.genre[0].name));
    else if (byWhat === 'По названию') this.booksArray.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.activeFilter = byWhat
    this.paginatedData(0)
  }

  async deleteBook(id: number) {
    try {
      await this.http.deleteBook(id)
    } catch (error) {
    } finally {
      await this.getBooks()
    }
  }

  async getBooks() {
    let response = await this.http.getBooks()
    this.booksArray = response.body
    this.filter_by(this.activeFilter)
  }

  async ngOnInit() {
    await this.getBooks()
  }


}
