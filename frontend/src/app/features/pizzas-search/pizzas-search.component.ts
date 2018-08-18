import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

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
      .pipe(
        takeUntil(this.onDestroy$.asObservable()),
        debounceTime(200),
        tap(search => this.onSearch.emit(search))
      )
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
