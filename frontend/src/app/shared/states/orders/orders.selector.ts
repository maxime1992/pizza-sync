import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IStore } from 'app/shared/interfaces/store.interface';
import {
  IOrdersSummary,
  IPizzaOrderSummary,
  IOrdersTable,
} from 'app/shared/states/orders/orders.interface';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';

const pizzaPriceIndexToSize = {
  0: 'S',
  1: 'M',
  2: 'L',
  3: 'XL',
};

export function _getOrderSummary(
  ordersTable: IOrdersTable,
  pizzasTable: IPizzasTable
): IOrdersSummary {
  const ordersSummaryMap = ordersTable.allIds.reduce(
    (acc: { [key: string]: IPizzaOrderSummary }, orderId: string) => {
      const order = ordersTable.byId[orderId];
      const pizza = pizzasTable.byId[order.pizzaId];
      const pizzaSize = pizzaPriceIndexToSize[order.priceIndex];

      if (!acc[pizza.id]) {
        acc[pizza.id] = {
          pizzaName: pizza.name,
          howManyPerSize: {
            S: { size: 'S', howMany: 0 },
            M: { size: 'M', howMany: 0 },
            L: { size: 'L', howMany: 0 },
            XL: { size: 'XL', howMany: 0 },
          },
        };
      }

      acc[pizza.id].howManyPerSize[pizzaSize].howMany++;

      return acc;
    },
    {}
  );

  const pizzasIds = Object.keys(ordersSummaryMap);
  const rslt = pizzasIds.map(pizzaId => ordersSummaryMap[pizzaId]);

  return rslt;
}

export function getOrderSummary(
  store$: Store<IStore>
): Observable<IOrdersSummary> {
  return store$
    .select(state => ({ orders: state.orders, pizzas: state.pizzas }))
    .distinctUntilChanged(
      (p, n) => p.pizzas === n.pizzas && p.orders === n.orders
    )
    .map(data => _getOrderSummary(data.orders, data.pizzas));
}
