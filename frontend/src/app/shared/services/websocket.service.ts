import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { connect } from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { IStore } from './../interfaces/store.interface';
import { Users } from './../state/users/users.reducer';
import { IOrder } from './../state/orders/orders.interface';
import { environment } from './../../../environments/environment';
import { Orders } from './../state/orders/orders.reducer';

@Injectable()
export class WebsocketService {
  private _socket: SocketIOClient.Socket;

  constructor(private _store: Store<IStore>) {
    this._socket = connect(environment.urlBackend);

    this._socket.on('USER_CONNECTED', user => this._onUserConnected(user));
    this._socket.on('ADD_ORDER', order => this._onAddOrder(order));
  }

  private _onUserConnected(user) {
    this._store.dispatch({ type: Users.ADD_USER_SUCCESS, payload: user });
  }

  public addOrder(order: IOrder) {
    this._socket.emit('ADD_ORDER', order);
  }

  private _onAddOrder(order: IOrder) {
    this._store.dispatch({
      type: Orders.ADD_ORDER_SUCCESS,
      payload: order
    });
  }
}
