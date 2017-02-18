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
  @Effect({ dispatch: false }) addOrder$ = this._actions$
    .ofType(Orders.ADD_ORDER)
    .withLatestFrom(this._store$.select(state => state.users.idCurrentUser))
    .map(([action, idCurrentUser]) =>
      this._webSocketService.addOrder(
        { ...action.payload, userId: idCurrentUser }
      )
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) removeOrder$ = this._actions$
    .ofType(Orders.REMOVE_ORDER)
    .map((action) =>
      this._webSocketService.removeOrder(action.payload.id)
    );
}
