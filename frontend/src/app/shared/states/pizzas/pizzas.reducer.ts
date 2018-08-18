import { ActionReducer, Action } from '@ngrx/store';
import * as PizzasActions from 'app/shared/states/pizzas//pizzas.actions';
import {
  IPizzasTable,
  IPizzaCommon,
} from 'app/shared/states/pizzas/pizzas.interface';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

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
