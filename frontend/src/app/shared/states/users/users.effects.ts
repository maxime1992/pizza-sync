import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as UsersActions from 'app/shared/states/users/users.actions';
import { WebsocketService } from 'app/shared/services/websocket.service';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private websocketService: WebsocketService
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  identification$ = this.actions$
    .ofType<UsersActions.Identification>(UsersActions.IDENTIFICATION)
    .do(action => this.websocketService.connectUser(action.payload));
}
