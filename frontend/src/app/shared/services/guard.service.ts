import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { batchActions } from 'redux-batched-actions';

import { UsersService } from './users.service';
import { LocalStorageService } from 'ng2-webstorage';
import { IStore } from './../interfaces/store.interface';
import { Ui } from './../state/ui/ui.reducer';
import { Users } from './../state/users/users.reducer';

@Injectable()
export class GuardService implements CanActivate {
  constructor(
    private _store$: Store<IStore>,
    private _storage: LocalStorageService,
    private _userService: UsersService
  ) { }

  canActivate() {
    const username = this._storage.retrieve('username') || '';

    if (username === '') {
      return Observable.of(true);
    }

    return this._userService.checkUserAlreadyConnected(username)
      .map(user => {
        if (user !== null) {
          this._store$.dispatch(batchActions([
            { type: Ui.CLOSE_DIALOG_IDENTIFICATION },
            { type: Users.IDENTIFICATION_SUCCESS, payload: user.id }
          ]));
        }

        return true;
      });
  }
}
