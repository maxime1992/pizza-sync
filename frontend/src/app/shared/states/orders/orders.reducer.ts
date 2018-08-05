import { ActionReducer, Action } from '@ngrx/store';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';
import {
  IOrdersTable,
  IOrderCommon,
  IOrder,
} from 'app/shared/states/orders/orders.interface';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const ordersAdapter: EntityAdapter<IOrder> = createEntityAdapter<
  IOrder
>();

export function ordersInitState(): IOrdersTable {
  return ordersAdapter.getInitialState({
    hourEnd: null,
    minuteEnd: null,
  });
}

export function ordersReducer(
  ordersTbl = ordersInitState(),
  action: OrdersActions.All
): IOrdersTable {
  switch (action.type) {
    case OrdersActions.LOAD_ORDERS_SUCCESS: {
      return {
        ...ordersTbl,
        ...action.payload,
      };
    }

    case OrdersActions.ADD_ORDER_SUCCESS: {
      return ordersAdapter.addOne(action.payload, ordersTbl);
    }

    case OrdersActions.REMOVE_ORDER: {
      return ordersAdapter.updateOne(
        { id: action.payload.id, changes: { isBeingRemoved: true } },
        ordersTbl
      );
    }

    case OrdersActions.REMOVE_ORDER_SUCCESS: {
      return ordersAdapter.removeOne(action.payload.id, ordersTbl);
    }

    case OrdersActions.SET_COUNTDOWN: {
      return {
        ...ordersTbl,
        hourEnd: action.payload.hour,
        minuteEnd: action.payload.minute,
      };
    }

    default:
      return ordersTbl;
  }
}
