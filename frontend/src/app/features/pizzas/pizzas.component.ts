import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IPizzas } from './../../shared/state/pizzas/pizzas.interface';
import { IStore } from './../../shared/interfaces/store.interface';
import { Pizzas } from './../../shared/state/pizzas/pizzas.reducer';
import { getCategoriesAndPizzas } from './../../shared/state/pizzas-categories/pizzas-categories.selector';
import { IPizzaCategoryWithPizzas } from './../../shared/state/pizzas-categories/pizzas-categories.interface';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  public pizzasCategories$: Observable<IPizzaCategoryWithPizzas[]>;

  constructor(private _store$: Store<IStore>) { }

  ngOnInit() {
    this._store$.dispatch({ type: Pizzas.LOAD_PIZZAS });

    this.pizzasCategories$ = this._store$.let(getCategoriesAndPizzas());
  }
}
