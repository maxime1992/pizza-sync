import { ActionReducer, Action } from '@ngrx/store';

import * as PizzasActions from 'app/shared/states/pizzas//pizzas.actions';
import { pizzasState } from 'app/shared/states/pizzas/pizzas.initial-state';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';

export function pizzasReducer(
  ordersTbl = pizzasState(),
  action: PizzasActions.All
): IPizzasTable {
  switch (action.type) {
    case PizzasActions.LOAD_PIZZAS_SUCCESS: {
      return {
        ...ordersTbl,
        ...action.payload,
      };
    }

    default:
      return ordersTbl;
  }
}
