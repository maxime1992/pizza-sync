import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { batchActions } from 'redux-batched-actions';

import { Pizzas } from './../../shared/state/pizzas/pizzas.reducer';
import { PizzasService } from './pizzas.service';
import { PizzasCategories } from './../../shared/state/pizzas-categories/pizzas-categories.reducer';
import { Users } from './../../shared/state/users/users.reducer';
import { Orders } from './../../shared/state/orders/orders.reducer';

@Injectable()
export class PizzasEffects {
  constructor(private _actions$: Actions, private _pizzaService: PizzasService) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: true }) initialLoad$: Observable<Action> = this._actions$
    .ofType(Pizzas.LOAD_PIZZAS)
    .switchMap((action: Action) =>
      this._pizzaService.getPizzas()
        .map(res => {
          return batchActions([
            {
              type: Pizzas.LOAD_PIZZAS_SUCCESS,
              payload: res.pizzas
            },
            {
              type: PizzasCategories.LOAD_PIZZAS_CATEGORIES_SUCCESS,
              payload: res.pizzasCategories
            },
            {
              type: Users.LOAD_USERS_SUCCESS,
              payload: res.users
            },
            {
              type: Orders.LOAD_ORDERS_SUCCESS,
              payload: res.orders
            }
          ]);
        })
    );
}
