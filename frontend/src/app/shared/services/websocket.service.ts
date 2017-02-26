import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { connect } from 'socket.io-client';
import { LocalStorageService } from 'ng2-webstorage';

import { environment } from './../../../environments/environment';
import { IStore } from './../interfaces/store.interface';
import { Users } from './../state/users/users.reducer';
import { Ui } from './../state/ui/ui.reducer';
import { IOrderCommon } from './../state/orders/orders.interface';
import { Orders } from './../state/orders/orders.reducer';

@Injectable()
export class WebsocketService {
  private _socket: SocketIOClient.Socket;

  constructor(private _store$: Store<IStore>, private _storage: LocalStorageService) {
    this._socket = connect(environment.urlBackend);

    // TODO(SPLIT_SOCKET) : Instead of handling every socket from here, we should handle them from separate services
    this._socket.on('CONNECT_USER_SUCCESS', user => this._connectUserSuccess(user));
    this._socket.on('ADD_ORDER_SUCCESS', order => this._onAddOrderSuccess(order));
    this._socket.on('REMOVE_ORDER_SUCCESS', orderId => this._onRemoveOrderSuccess(orderId));
    this._socket.on('DISCONNECT_USER_SUCCESS', userId => this._onDisconnectUserSuccess(userId));
    this._socket.on('SET_COUNTDOWN',
      ({ hour, minute }: { hour: number, minute: number }) => this._onSetCountdown(hour, minute)
    );
  }

  public connectUser(username: string) {
    this._storage.store('username', username);
    this._socket.emit('CONNECT_USER', username);
  }

  private _connectUserSuccess(user) {
    if (this._storage.retrieve('username') === user.username) {
      this._store$.dispatch({ type: Users.IDENTIFICATION_SUCCESS, payload: user.id });
      this._store$.dispatch({ type: Ui.CLOSE_DIALOG_IDENTIFICATION });
    }

    this._store$.dispatch({ type: Users.ADD_USER_SUCCESS, payload: user });
  }

  public addOrder(order: IOrderCommon) {
    this._socket.emit('ADD_ORDER', order);
  }

  private _onAddOrderSuccess(order: IOrderCommon) {
    this._store$.dispatch({
      type: Orders.ADD_ORDER_SUCCESS,
      payload: order
    });
  }

  public removeOrder(orderId: string) {
    this._socket.emit('REMOVE_ORDER', orderId);
  }

  private _onRemoveOrderSuccess(orderId: string) {
    this._store$.dispatch({ type: Orders.REMOVE_ORDER_SUCCESS, payload: { id: orderId } });
  }

  private _onUserOnline(userId: string) {
    this._store$.dispatch({
      type: Users.SET_USER_ONLINE,
      payload: { id: userId }
    });
  }

  private _onDisconnectUserSuccess(userId: string) {
    this._store$.dispatch({
      type: Users.SET_USER_OFFLINE,
      payload: { id: userId }
    });
  }

  private _onSetCountdown(hour: number, minute: number) {
    this._store$.dispatch({ type: Orders.SET_COUNTDOWN, payload: { hour, minute }});
  }
}
