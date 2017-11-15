import { ActionReducer, Action } from '@ngrx/store';

import * as OrdersActions from 'app/shared/states/orders/orders.actions';
import { ordersState } from 'app/shared/states/orders/orders.initial-state';
import { IOrdersTable } from 'app/shared/states/orders/orders.interface';

export function ordersReducer(
  ordersTbl = ordersState(),
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
      return {
        ...ordersTbl,
        byId: {
          ...ordersTbl.byId,
          [action.payload.id]: action.payload,
        },
        allIds: [...ordersTbl.allIds, action.payload.id],
      };
    }

    case OrdersActions.REMOVE_ORDER: {
      return {
        ...ordersTbl,
        byId: {
          ...ordersTbl.byId,
          [action.payload.id]: {
            ...ordersTbl.byId[action.payload.id],
            isBeingRemoved: true,
          },
        },
      };
    }

    case OrdersActions.REMOVE_ORDER_SUCCESS: {
      const ordersTmp: IOrdersTable = {
        ...ordersTbl,
        byId: { ...ordersTbl.byId },
        allIds: ordersTbl.allIds.filter(
          orderId => orderId !== action.payload.id
        ),
      };

      delete ordersTmp.byId[action.payload.id];

      return ordersTmp;
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
