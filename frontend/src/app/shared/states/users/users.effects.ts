import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { WebsocketService } from 'app/shared/services/websocket.service';
import * as UsersActions from 'app/shared/states/users/users.actions';

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
    .pipe(tap(action => this.websocketService.connectUser(action.payload)));
}
