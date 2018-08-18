import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ng2-webstorage';
import * as io from 'socket.io-client';

import { IStore } from 'app/shared/interfaces/store.interface';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';
import { INewOrder, IOrder } from 'app/shared/states/orders/orders.interface';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import * as UsersActions from 'app/shared/states/users/users.actions';
import { environment } from 'environments/environment';

@Injectable()
export class WebsocketService {
  private socket: SocketIOClient.Socket = io(environment.urlBackend);

  constructor(
    private store$: Store<IStore>,
    private storage: LocalStorageService
  ) {
    // TODO(SPLIT_SOCKET) : Instead of handling every socket from here, we should handle them from separate services
    this.socket.on('CONNECT_USER_SUCCESS', user => {
      this.connectUserSuccess(user);
    });

    this.socket.on('DISCONNECT_USER_SUCCESS', userId =>
      this.onDisconnectUserSuccess(userId)
    );

    this.socket.on('ADD_ORDER_SUCCESS', order => this.onAddOrderSuccess(order));

    this.socket.on('REMOVE_ORDER_SUCCESS', orderId =>
      this.onRemoveOrderSuccess(orderId)
    );

    this.socket.on(
      'SET_COUNTDOWN',
      ({ hour, minute }: { hour: number; minute: number }) => {
        this.onSetCountdown(hour, minute);
      }
    );
  }

  public connectUser(username: string) {
    this.storage.store('username', username);
    this.socket.emit('CONNECT_USER', username);
  }

  private connectUserSuccess(user) {
    if (this.storage.retrieve('username') === user.username) {
      this.store$.dispatch(new UsersActions.IdentificationSuccess(user.id));
      this.store$.dispatch(new UiActions.CloseDialogIdentification());
    }

    this.store$.dispatch(new UsersActions.AddUserSuccess(user));
  }

  public addOrder(order: INewOrder & { userId: string }) {
    this.socket.emit('ADD_ORDER', order);
  }

  private onAddOrderSuccess(order: IOrder) {
    this.store$.dispatch(new OrdersActions.AddOrderSuccess(order));
  }

  public removeOrder(orderId: string) {
    this.socket.emit('REMOVE_ORDER', orderId);
  }

  private onRemoveOrderSuccess(id: string) {
    this.store$.dispatch(new OrdersActions.RemoveOrderSuccess({ id }));
  }

  private onDisconnectUserSuccess(id: string) {
    this.store$.dispatch(new UsersActions.SetUserOffline({ id }));
  }

  private onSetCountdown(hour: number, minute: number) {
    this.store$.dispatch(new OrdersActions.SetCountdown({ hour, minute }));
  }
}
