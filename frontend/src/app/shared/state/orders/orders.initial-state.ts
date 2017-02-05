import { IOrdersTable } from './orders.interface';

export function ordersState(): IOrdersTable {
  return {
    byId: { },
    allIds: []
  };
};
