import { IOrdersTable } from 'app/shared/states/orders/orders.interface';

export function ordersState(): IOrdersTable {
  return {
    hourEnd: null,
    minuteEnd: null,

    byId: {},
    allIds: [],
  };
}
