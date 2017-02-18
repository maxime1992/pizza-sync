import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { IStore } from './../../interfaces/store.interface';
import { Orders } from './orders.reducer';
import { WebsocketService } from './../../services/websocket.service';

@Injectable()
export class OrdersEffects {
  constructor(private _store$: Store<IStore>, private _actions$: Actions, private _webSocketService: WebsocketService) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) addOrder$ = this._actions$
    .ofType(Orders.ADD_ORDER)
    .withLatestFrom(this._store$.select(state => state.users.idCurrentUser))
    .do(([action, idCurrentUser]) =>
      this._webSocketService.addOrder({ ...action.payload, userId: idCurrentUser })
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) removeOrder$ = this._actions$
    .ofType(Orders.REMOVE_ORDER)
    .do(action => this._webSocketService.removeOrder(action.payload.id));
}
