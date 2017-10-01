import { ActionReducer, Action } from '@ngrx/store';

import * as PizzasCategoriesActions from 'app/shared/states/pizzas-categories/pizzas-categories.actions';
import { pizzasCategoriesState } from 'app/shared/states/pizzas-categories/pizzas-categories.initial-state';
import { IPizzasCategoriesTable } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';

export function pizzasCategoriesReducer(
  pizzasCategoriesTbl = pizzasCategoriesState(),
  action: PizzasCategoriesActions.All
): IPizzasCategoriesTable {
  switch (action.type) {
    case PizzasCategoriesActions.LOAD_PIZZAS_CATEGORIES_SUCCESS: {
      return {
        ...pizzasCategoriesTbl,
        ...action.payload,
      };
    }

    default:
      return pizzasCategoriesTbl;
  }
}
