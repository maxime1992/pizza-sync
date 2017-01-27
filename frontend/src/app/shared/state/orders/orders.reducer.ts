import { ActionReducer, Action } from '@ngrx/store';

import { ordersState } from './orders.initial-state';
import { IOrders } from './orders.interface';

export class Orders {
  private static reducerName = 'ORDERS_REDUCER';

  public static reducer(orders = ordersState(), {type, payload}: Action) {
    if (typeof Orders.mapActionsToMethod[type] === 'undefined') {
      return orders;
    }

    return Orders.mapActionsToMethod[type](orders, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_ORDERS_SUCCESS = `${Orders.reducerName}_LOAD_ORDERS_SUCCESS`;
  private static loadOrdersSuccess(orders, type, payload) {
    return Object.assign(<IOrders>{}, orders, payload);
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Orders.LOAD_ORDERS_SUCCESS]: Orders.loadOrdersSuccess
  };
}
