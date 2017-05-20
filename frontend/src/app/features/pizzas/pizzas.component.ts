import { Component, OnInit, ChangeDetectorRef, Input, OnChanges } from '@angular/core';
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
export class PizzasComponent implements OnInit, OnChanges {
  @Input() locked: boolean;
  private pizzasCategories$: Observable<IPizzaCategoryWithPizzas[]>;
  public pizzasCategories: IPizzaCategoryWithPizzas[];

  constructor(private cd: ChangeDetectorRef, private store$: Store<IStore>) { }

  ngOnInit() {
    this.store$.dispatch(new PizzasActions.LoadPizzas());

    this.pizzasCategories$ = this.store$.let(getCategoriesAndPizzas());

    // pizzas are fetched once and never updated for the session
    // we basically need to get values once
    // as we're building the view from a selector, everytime the
    // part of store being watched is updated, it'll re-compute
    // everything. To avoid that, manually launch the detect changes
    // once as soon as the pizzas are fetched and then detach from
    // change detection
    this
      .pizzasCategories$
      .filter(p => p.length > 0)
      .first()
      .do(cp => {
        this.pizzasCategories = cp;
        this.cd.detectChanges();
        this.cd.detach();
      })
      .subscribe();
  }

  ngOnChanges() {
    this.cd.detectChanges();
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
