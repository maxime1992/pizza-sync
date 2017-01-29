import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { connect } from 'socket.io-client';

import { IStore } from './../interfaces/store.interface';
import { Users } from './../state/users/users.reducer';

@Injectable()
export class WebsocketService {
  constructor(private _store: Store<IStore>) {
    const socket = connect('http://localhost:3000');

    socket.on('USER_CONNECTED', user =>
      this._store.dispatch({ type: Users.ADD_USER_SUCCESS, payload: user })
    );
  }
}
