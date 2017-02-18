import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { WebsocketService } from './../../services/websocket.service';
import { Users } from './users.reducer';

@Injectable()
export class UsersEffects {
  constructor(
    private _actions$: Actions,
    private _websocketService: WebsocketService
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false }) identification$ = this._actions$
    .ofType(Users.IDENTIFICATION)
    .do(action => this._websocketService.connectUser(action.payload.username));
}
