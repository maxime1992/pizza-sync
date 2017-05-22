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

export interface IPizzaOrderSummary {
  pizzaName: string;
  howManyPerSize: { [size: string]: { size: string, howMany: number } };
}

// tslint:disable:no-empty-interface
export interface IOrdersSummary extends Array<IPizzaOrderSummary> { }

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
