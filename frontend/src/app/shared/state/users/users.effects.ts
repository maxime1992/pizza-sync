import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { batchActions } from 'redux-batched-actions';
import { LocalStorageService } from 'ng2-webstorage';

import { UsersService } from './../../services/users.service';
import { Users } from './users.reducer';
import { Ui } from './../ui/ui.reducer';
import { IUser } from './users.interface';

@Injectable()
export class UsersEffects {
  constructor(
    private _actions$: Actions,
    private _usersService: UsersService,
    private _storage: LocalStorageService
  ) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: true }) identification$: Observable<Action> = this._actions$
    .ofType(Users.IDENTIFICATION)
    .switchMap((action: Action) =>
      this._usersService.identification(action.payload)
        .map((user: IUser) => {
          this._storage.store('username', user.username);

          return batchActions([
            { type: Users.IDENTIFICATION_SUCCESS, payload: user.id },
            { type: Ui.CLOSE_DIALOG_IDENTIFICATION }
          ]);
        })
    );
}
