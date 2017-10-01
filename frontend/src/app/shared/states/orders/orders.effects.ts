import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { IStore } from 'app/shared/interfaces/store.interface';
import { WebsocketService } from 'app/shared/services/websocket.service';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';

@Injectable()
export class OrdersEffects {
  constructor(
    private store$: Store<IStore>,
    private actions$: Actions,
    private webSocketService: WebsocketService
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  addOrder$ = this.actions$
    .ofType<OrdersActions.AddOrder>(OrdersActions.ADD_ORDER)
    .withLatestFrom(this.store$.select(state => state.users.idCurrentUser))
    .do(([action, idCurrentUser]) =>
      this.webSocketService.addOrder({
        ...action.payload,
        userId: idCurrentUser,
      })
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeOrder$ = this.actions$
    .ofType<OrdersActions.RemoveOrder>(OrdersActions.REMOVE_ORDER)
    .do(action => this.webSocketService.removeOrder(action.payload.id));
}
