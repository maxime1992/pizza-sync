import { ActionReducer, Action } from '@ngrx/store';

import { IPizzasCategories } from './pizzas-categories.interface';
import { pizzasCategoriesState } from './pizzas-categories.initial-state';

export class PizzasCategories {
  private static reducerName = 'PIZZAS_CATEGORIES_REDUCER';

  public static reducer(pizzasCategories = pizzasCategoriesState(), {type, payload}: Action) {
    if (typeof PizzasCategories.mapActionsToMethod[type] === 'undefined') {
      return pizzasCategories;
    }

    return PizzasCategories.mapActionsToMethod[type](pizzasCategories, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_PIZZAS_CATEGORIES_SUCCESS = `${PizzasCategories.reducerName}_LOAD_PIZZAS_CATEGORIES_SUCCESS`;
  private static loadPizzasCategoriesSuccess(pizzasCategories, type, payload) {
    return Object.assign(<IPizzasCategories>{}, pizzasCategories, payload);
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [PizzasCategories.LOAD_PIZZAS_CATEGORIES_SUCCESS]: PizzasCategories.loadPizzasCategoriesSuccess,
  };
}
