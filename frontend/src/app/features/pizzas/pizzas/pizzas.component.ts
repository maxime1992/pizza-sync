import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IStore } from './../../../shared/interfaces/store.interface';
import { Pizzas } from './../../../shared/state/pizzas/pizzas.reducer';
import { IPizzas } from './../../../shared/state/pizzas/pizzas.interface';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  public pizzas$: Observable<IPizzas>;

  constructor(private _store$: Store<IStore>) { }

  ngOnInit() {
    this._store$.dispatch({ type: Pizzas.LOAD_PIZZAS });

    this.pizzas$ = this._store$.select(state => state.pizzas);
  }
}
