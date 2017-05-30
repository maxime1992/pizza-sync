import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IPizzaCategoryWithPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IStore } from 'app/shared/interfaces/store.interface';
import { getCategoriesAndPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.selector';
import { IPizzaCommon } from 'app/shared/states/pizzas/pizzas.interface';
import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  @Input() locked: boolean;

  private pizzasCategories$: Observable<IPizzaCategoryWithPizzas[]>;
  public pizzasCategories: IPizzaCategoryWithPizzas[];
  public search$: Observable<string>;

  constructor(private store$: Store<IStore>) { }

  ngOnInit() {
    this.store$.dispatch(new PizzasActions.LoadPizzas());

    this.search$ = this.store$.select(state => state.ui.pizzaSearch);

    this.pizzasCategories$ = this.store$.let(getCategoriesAndPizzas);
  }

  addOrder(pizza: IPizzaCommon, priceIndex: number) {
    this.store$.dispatch(new OrdersActions.AddOrder({
      pizzaId: pizza.id,
      priceIndex
    }));
  }

  trackById(index, item) {
    return item.id;
  }
}
