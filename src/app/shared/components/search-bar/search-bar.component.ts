import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() onValueChange = new EventEmitter<string>();

  constructor() {}
  ngOnInit() {}

  keyUp(value: any) {
    this.onValueChange.emit(value);
    console.log(value);
  }
}
