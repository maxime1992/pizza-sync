import { IOrdersTable } from './orders.interface';

export function ordersState(): IOrdersTable {
  return {
    hourEnd: null,
    minuteEnd: null,

    byId: {},
    allIds: []
  };
};
