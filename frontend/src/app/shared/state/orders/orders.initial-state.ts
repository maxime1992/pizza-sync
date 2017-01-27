import { IOrders } from './orders.interface';

export function ordersState(): IOrders {
  return {
    byId: { },
    allIds: []
  };
};
