import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-pizzas-search',
  templateUrl: './pizzas-search.component.html',
  styleUrls: ['./pizzas-search.component.scss'],
})
export class PizzasSearchComponent implements OnInit, OnChanges, OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Input() searchedText?: string;
  @ViewChild(MatInput) searchInput: MatInput;
  @Output() onSearch = new EventEmitter<string>();
  public search = new FormControl();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      this.searchInput.focus();
    }
  }

  constructor() {}

  ngOnInit() {
    this.search.valueChanges
      .takeUntil(this.onDestroy$.asObservable())
      .debounceTime(200)
      .do(search => this.onSearch.emit(search))
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchedText']) {
      this.search.patchValue(this.searchedText);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
