import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { batchActions } from 'redux-batched-actions';

import { Orders } from './orders.reducer';
import { OrdersService } from './../../services/orders.service';

@Injectable()
export class OrdersEffects {
  constructor(private _actions$: Actions, private _ordersService: OrdersService) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: true }) initialLoad$: Observable<Action> = this._actions$
    .ofType(Orders.ADD_ORDER)
    .mergeMap((action: Action) =>
      this._ordersService.addOrder(action.payload)
        .map(order => {
          return {
            type: Orders.ADD_ORDER_SUCCESS,
            payload: order
          };
        })
    );
}
