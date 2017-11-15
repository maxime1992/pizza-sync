import { Action } from '@ngrx/store';

import {
  IOrder,
  IOrdersTable,
  INewOrder,
} from 'app/shared/states/orders/orders.interface';

export const LOAD_ORDERS_SUCCESS = '[Orders] Load orders success';
export class LoadOrdersSuccess implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;

  constructor(public payload: IOrdersTable) {}
}

export const ADD_ORDER = '[Orders] Add order';
export class AddOrder implements Action {
  readonly type = ADD_ORDER;

  constructor(public payload: INewOrder) {}
}

export const ADD_ORDER_SUCCESS = '[Orders] Add order success';
export class AddOrderSuccess implements Action {
  readonly type = ADD_ORDER_SUCCESS;

  constructor(public payload: IOrder) {}
}

export const REMOVE_ORDER = '[Orders] Remove order';
export class RemoveOrder implements Action {
  readonly type = REMOVE_ORDER;

  constructor(public payload: { id: string }) {}
}

export const REMOVE_ORDER_SUCCESS = '[Orders] Remove order success';
export class RemoveOrderSuccess implements Action {
  readonly type = REMOVE_ORDER_SUCCESS;

  constructor(public payload: { id: string }) {}
}

export const SET_COUNTDOWN = '[Orders] Set countdown';
export class SetCountdown implements Action {
  readonly type = SET_COUNTDOWN;

  constructor(public payload: { hour: number; minute: number }) {}
}

export type All =
  | LoadOrdersSuccess
  | AddOrder
  | AddOrderSuccess
  | RemoveOrder
  | RemoveOrderSuccess
  | SetCountdown;
