import {Component, OnInit} from '@angular/core';
import {BooksService} from "./books.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BooksService]
})
export class AppComponent implements OnInit{
  array: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  hoverIndex: number = -1
  fullBookCardActive: boolean = false
  addFormActive: boolean = true
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
  ngOnInit() {

  }


}
