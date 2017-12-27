import { Component } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
} from '@nestjs/websockets';

import { NormalizedModel } from '../normalized-model.class';
import { IOrderWithId, IOrderWithoutId } from './orders.interface';

@WebSocketGateway()
export class OrdersService extends NormalizedModel<IOrderWithoutId>
  implements OnGatewayConnection {
  @WebSocketServer() server;

  // when the app should stop accepting orders
  private hourEnd: number;
  private minuteEnd: number;

  constructor() {
    super('orderId');

    // by default, the app stop accepting orders after 1 hour
    const currentDate = new Date();
    this.setHourAndMinuteEnd(
      currentDate.getHours() + 1,
      currentDate.getMinutes(),
      false
    );
  }

  getHourEnd() {
    return this.hourEnd;
  }

  getMinuteEnd() {
    return this.minuteEnd;
  }

  // TODO: add a command line to change this
  setHourAndMinuteEnd(hourEnd, minuteEnd, broadcast = true) {
    this.hourEnd = hourEnd;
    this.minuteEnd = minuteEnd;

    if (broadcast) {
      this.server.sockets.emit('SET_COUNTDOWN', {
        hour: this.hourEnd,
        minute: this.minuteEnd,
      });
    }
  }

  handleConnection(client: any) {
    client.emit('SET_COUNTDOWN', {
      hour: this.hourEnd,
      minute: this.minuteEnd,
    });
  }

  @SubscribeMessage('ADD_ORDER')
  addOrder(client, orderWithoutId: IOrderWithoutId) {
    // TODO : block if current time >= hourEnd and minuteEnd
    const order = this.create(orderWithoutId);

    this.server.sockets.emit('ADD_ORDER_SUCCESS', order);
  }

  @SubscribeMessage('REMOVE_ORDER')
  removeOrder(client, orderId: string) {
    // TODO : block if current time >= hourEnd and minuteEnd
    const hasOrderBeenRemoved = this.delete(orderId);

    if (hasOrderBeenRemoved) {
      this.server.sockets.emit('REMOVE_ORDER_SUCCESS', orderId);
    }
  }
}
