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
  public book: any = {
    name: '',
    author: '',
    date: null,
    genreIds: [],
    description: ''
  }
  public genres: any = []
  constructor(private http: BooksService) { }

  close() {
    this.switchAddForm.emit(false)
  }
  createBook(book: object) {
    this.http.createBook(book).subscribe(response => {
      console.log(response.status)
    })
  }
  ngOnInit() {
    this.http.getGenres().subscribe(response => {
      this.genres = response.body
    })
  }

}
