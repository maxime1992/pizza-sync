import { map, distinctUntilChanged } from 'rxjs/operators';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IStore } from 'app/shared/interfaces/store.interface';
import {
  IOrdersSummary,
  IPizzaOrderSummary,
  IOrdersTable,
  IOrder,
} from 'app/shared/states/orders/orders.interface';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';
import { ordersAdapter } from './orders.reducer';
import { selectPizzasEntities } from '../pizzas/pizzas.selector';

const pizzaPriceIndexToSize = {
  0: 'S',
  1: 'M',
  2: 'L',
  3: 'XL',
};

const {
  selectIds: _selectOrdersIds,
  selectEntities: _selectOrdersEntities,
  selectAll: _selectOrdersAll,
  selectTotal: _selectOrdersTotal,
} = ordersAdapter.getSelectors();

export const selectOrdersState = createFeatureSelector<IOrdersTable>('orders');

export const selectOrdersIds = createSelector(
  selectOrdersState,
  _selectOrdersIds
);
export const selectOrdersEntities = createSelector(
  selectOrdersState,
  _selectOrdersEntities
);
export const selectOrdersAll = createSelector(
  selectOrdersState,
  _selectOrdersAll
);
export const selectOrdersTotal = createSelector(
  selectOrdersState,
  _selectOrdersTotal
);

export const getOrderSummary = createSelector(
  selectOrdersAll,
  selectPizzasEntities,
  (ordersAll, pizzasEntities) => {
    const ordersSummaryMap = ordersAll.reduce(
      (acc: { [key: string]: IPizzaOrderSummary }, order: IOrder) => {
        const pizza = pizzasEntities[order.pizzaId];
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

    return pizzasIds.map(pizzaId => ordersSummaryMap[pizzaId]);
  }
);

export const getTimeEnd = createSelector(selectOrdersState, orderState => ({
  hour: orderState.hourEnd,
  minute: orderState.minuteEnd,
}));
