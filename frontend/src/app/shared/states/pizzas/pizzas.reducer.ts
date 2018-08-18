import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as PizzasActions from 'app/shared/states/pizzas//pizzas.actions';
import {
  IPizzaCommon,
  IPizzasTable,
} from 'app/shared/states/pizzas/pizzas.interface';

export const pizzasAdapter: EntityAdapter<IPizzaCommon> = createEntityAdapter<
  IPizzaCommon
>();

export function pizzasInitState(): IPizzasTable {
  return pizzasAdapter.getInitialState();
}

export function pizzasReducer(
  pizzasTbl = pizzasInitState(),
  action: PizzasActions.All
): IPizzasTable {
  switch (action.type) {
    case PizzasActions.LOAD_PIZZAS_SUCCESS: {
      return {
        ...pizzasTbl,
        ...action.payload,
      };
    }

    default:
      return pizzasTbl;
  }
}
