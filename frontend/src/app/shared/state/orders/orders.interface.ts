import { IPizzaCommon } from './../pizzas/pizzas.interface';

export interface IOrderCommon {
  id: string;
  userId: string;
  pizzaId: string;
  priceIndex: number;
  isBeingRemoved: boolean;
}

export interface IOrdersTable {
  byId: { [key: string]: IOrderCommon };
  allIds: string[];
}

export interface IOrderWithPizzas extends IOrderCommon {
  pizzas: IPizzaCommon[];
}
