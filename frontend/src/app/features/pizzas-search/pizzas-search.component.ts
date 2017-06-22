import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MdInputDirective } from '@angular/material';

@Component({
  selector: 'app-pizzas-search',
  templateUrl: './pizzas-search.component.html',
  styleUrls: ['./pizzas-search.component.scss']
})
export class PizzasSearchComponent implements OnInit {
  private onDestroy$ = new Subject<void>();

  @ViewChild(MdInputDirective) searchInput: MdInputDirective;
  @Output() onSearch = new EventEmitter<string>();
  public search = new FormControl();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.searchInput.focus();
    }
  }

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
