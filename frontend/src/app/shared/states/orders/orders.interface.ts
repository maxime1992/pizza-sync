import { IPizzaCommon } from 'app/shared/states/pizzas/pizzas.interface';
import { EntityState } from '@ngrx/entity';

export interface IOrderCommon {
  pizzaId: string;
  priceIndex: number;
}

export interface IOrder extends IOrderCommon {
  userId: string;
  id: string;
  isBeingRemoved: boolean;
}

// tslint:disable-next-line:no-empty-interface
export interface INewOrder extends IOrderCommon {}

export interface IPizzaOrderSummary {
  pizzaName: string;
  howManyPerSize: { [size: string]: { size: string; howMany: number } };
}

// tslint:disable:no-empty-interface
export interface IOrdersSummary extends Array<IPizzaOrderSummary> {}

export interface IOrdersTable extends EntityState<IOrder> {
  // when should we lock the orders
  hourEnd: number;
  minuteEnd: number;
}

export interface IOrderWithPizzas extends IOrder {
  pizzas: IPizzaCommon[];
}
