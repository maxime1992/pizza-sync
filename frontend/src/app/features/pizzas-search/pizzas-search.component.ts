import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-pizzas-search',
  templateUrl: './pizzas-search.component.html',
  styleUrls: ['./pizzas-search.component.scss']
})
export class PizzasSearchComponent implements OnInit {
  private onDestroy$ = new Subject<void>();

  @Output() onSearch = new EventEmitter<string>();
  public search = new FormControl();

  constructor() { }

  ngOnInit() {
    this.search
      .valueChanges
      .takeUntil(this.onDestroy$)
      .debounceTime(200)
      .do(search => this.onSearch.emit(search))
      .subscribe();
  }
}
