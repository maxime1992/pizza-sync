import { ActionReducer, Action } from '@ngrx/store';

import { IPizzasCategoriesTable } from './pizzas-categories.interface';
import { pizzasCategoriesState } from './pizzas-categories.initial-state';

export class PizzasCategories {
  private static reducerName = 'PIZZAS_CATEGORIES_REDUCER';

  public static reducer(pizzasCategoriesTbl = pizzasCategoriesState(), {type, payload}: Action) {
    if (typeof PizzasCategories.mapActionsToMethod[type] === 'undefined') {
      return pizzasCategoriesTbl;
    }

    return PizzasCategories.mapActionsToMethod[type](pizzasCategoriesTbl, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_PIZZAS_CATEGORIES_SUCCESS = `${PizzasCategories.reducerName}_LOAD_PIZZAS_CATEGORIES_SUCCESS`;
  private static loadPizzasCategoriesSuccess(pizzasCategoriesTbl, type, payload) {
    return <IPizzasCategoriesTable>{ ...pizzasCategoriesTbl, ...payload };
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [PizzasCategories.LOAD_PIZZAS_CATEGORIES_SUCCESS]: PizzasCategories.loadPizzasCategoriesSuccess,
  };
}
