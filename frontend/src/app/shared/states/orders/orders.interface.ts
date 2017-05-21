import { IPizzaCommon } from 'app/shared/states/pizzas/pizzas.interface';

export interface IOrderCommon {
  id: string;
  userId: string;
  pizzaId: string;
  priceIndex: number;
  isBeingRemoved: boolean;
}

export interface INewOrder {
  pizzaId: string;
  priceIndex: number;
}

export interface IOrdersTable {
  // when should we lock the orders
  hourEnd: number;
  minuteEnd: number;

  byId: { [key: string]: IOrderCommon };
  allIds: string[];
}

export interface IOrderWithPizzas extends IOrderCommon {
  pizzas: IPizzaCommon[];
}
