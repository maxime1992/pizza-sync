import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { batchActions } from 'redux-batched-actions';

import { Orders } from './orders.reducer';
import { OrdersService } from './../../services/orders.service';
import { WebsocketService } from './../../services/websocket.service';
import { IStore } from './../../interfaces/store.interface';

@Injectable()
export class OrdersEffects {
  constructor(private _store$: Store<IStore>, private _actions$: Actions, private _webSocketService: WebsocketService) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) initialLoad$ = this._actions$
    .ofType(Orders.ADD_ORDER)
    .withLatestFrom(this._store$.select(state => state.users.idCurrentUser))
    .map(([action, idCurrentUser]) =>
      this._webSocketService.addOrder(
        Object.assign({}, action.payload, { userId: idCurrentUser })
      )
    );
}
