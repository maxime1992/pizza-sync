import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';

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
    .pipe(
      withLatestFrom(this.store$.select(state => state.users.idCurrentUser)),
      tap(([action, idCurrentUser]) =>
        this.webSocketService.addOrder({
          ...action.payload,
          userId: idCurrentUser,
        })
      )
    );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  removeOrder$ = this.actions$
    .ofType<OrdersActions.RemoveOrder>(OrdersActions.REMOVE_ORDER)
    .pipe(tap(action => this.webSocketService.removeOrder(action.payload.id)));
}
