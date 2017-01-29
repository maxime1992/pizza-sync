import { ActionReducer, Action } from '@ngrx/store';

import { ordersState } from './orders.initial-state';
import { IOrder, IOrders } from './orders.interface';

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
  private static loadOrdersSuccess(orders: IOrders, type, payload) {
    return Object.assign(<IOrders>{}, orders, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static ADD_ORDER = `${Orders.reducerName}_ADD_ORDER`;

  // tslint:disable-next-line:member-ordering
  public static ADD_ORDER_SUCCESS = `${Orders.reducerName}_ADD_ORDER_SUCCESS`;
  private static addOrderSuccess(orders: IOrders, type, payload: IOrder) {
    return Object.assign(<IOrders>{}, orders, <IOrders>{
      byId: Object.assign({}, orders.byId, { [payload.id]: payload }),
      allIds: [...orders.allIds, payload.id]
    });
  }

  // tslint:disable-next-line:member-ordering
  public static REMOVE_ORDER = `${Orders.reducerName}_REMOVE_ORDER`;
  private static removeOrder(orders: IOrders, type, payload: IOrder) {
    return Object.assign(<IOrders>{}, orders, <IOrders>{
      byId: Object.assign({}, orders.byId, {
        [payload.id]: Object.assign({},
          orders.byId[payload.id],
          { isBeingRemoved: true }
        )
      })
    });
  }

  // tslint:disable-next-line:member-ordering
  public static REMOVE_ORDER_SUCCESS = `${Orders.reducerName}_REMOVE_ORDER_SUCCESS`;
  private static removeOrderSuccess(orders: IOrders, type, payload: IOrder) {
     const ordersTmp = Object.assign(<IOrders>{}, orders, <IOrders>{
      byId: Object.assign({}, orders.byId),
      allIds: orders.allIds.filter(orderId => orderId !== payload.id)
    });

    delete ordersTmp.byId[payload.id];

    return ordersTmp;
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Orders.LOAD_ORDERS_SUCCESS]: Orders.loadOrdersSuccess,
    [Orders.ADD_ORDER_SUCCESS]: Orders.addOrderSuccess,
    [Orders.REMOVE_ORDER]: Orders.removeOrder,
    [Orders.REMOVE_ORDER_SUCCESS]: Orders.removeOrderSuccess
  };
}
