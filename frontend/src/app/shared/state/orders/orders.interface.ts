import { IPizza } from './../pizzas/pizzas.interface';

export interface IOrder {
  id: string;
  userId: string;
  pizzaId: string;
  priceIndex: number;
  isBeingRemoved: boolean;
}

export interface IOrders {
  byId: { [key: string]: IOrder };
  allIds: string[];
}

export interface IOrderWithPizzas extends IOrder {
  pizzas: IPizza[];
}
