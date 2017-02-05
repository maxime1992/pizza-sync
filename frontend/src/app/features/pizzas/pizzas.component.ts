import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IPizzaCommon, IPizzasTable } from './../../shared/state/pizzas/pizzas.interface';
import { IStore } from './../../shared/interfaces/store.interface';
import { Pizzas } from './../../shared/state/pizzas/pizzas.reducer';
import { getCategoriesAndPizzas } from './../../shared/state/pizzas-categories/pizzas-categories.selector';
import { IPizzaCategoryWithPizzas } from './../../shared/state/pizzas-categories/pizzas-categories.interface';
import { Orders } from './../../shared/state/orders/orders.reducer';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  private _pizzasCategories$: Observable<IPizzaCategoryWithPizzas[]>;
  public pizzasCategories: IPizzaCategoryWithPizzas[];

  constructor(private _cd: ChangeDetectorRef, private _store$: Store<IStore>) { }

  ngOnInit() {
    this._store$.dispatch({ type: Pizzas.LOAD_PIZZAS });

    this._pizzasCategories$ = this._store$.let(getCategoriesAndPizzas());

    // pizzas are fetched once and never updated for the session
    // we basically need to get values once
    // as we're building the view from a selector, everytime the
    // part of store being watched is updated, it'll re-compute
    // everything. To avoid that, manually launch the detect changes
    // once as soon as the pizzas are fetched and then detach from
    // change detection
    this
      ._pizzasCategories$
      .filter(p => p.length > 0)
      .first()
      .do(cp => {
        this.pizzasCategories = cp;
        this._cd.detectChanges();
        this._cd.detach();
      })
      .subscribe();
  }

  addOrder(pizza: IPizzaCommon, priceIndex: number) {
    this._store$.dispatch({
      type: Orders.ADD_ORDER,
      payload: {
        pizzaId: pizza.id,
        priceIndex: priceIndex
      }
    });
  }
}
