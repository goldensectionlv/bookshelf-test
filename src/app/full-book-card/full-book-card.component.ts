import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-full-book-card',
  templateUrl: './full-book-card.component.html',
  styleUrls: ['./full-book-card.component.scss']
})
export class FullBookCardComponent implements OnInit {
  @Input() isActive: boolean = false
  @Input() book: any = {}
  @Output() closeFullCard = new EventEmitter()
  constructor() { }
  close() {
    this.closeFullCard.emit(false);
  }
  ngOnInit(): void {

  }

}
