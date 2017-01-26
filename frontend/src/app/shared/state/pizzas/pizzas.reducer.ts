import { ActionReducer, Action } from '@ngrx/store';

import { pizzasState } from './pizzas.initial-state';
import { IPizzas } from './pizzas.interface';

export class Pizzas {
  private static reducerName = 'PIZZAS_REDUCER';

  public static reducer(pizzas = pizzasState(), {type, payload}: Action) {
    if (typeof Pizzas.mapActionsToMethod[type] === 'undefined') {
      return pizzas;
    }

    return Pizzas.mapActionsToMethod[type](pizzas, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_PIZZAS = `${Pizzas.reducerName}_LOAD_PIZZAS`;

  // tslint:disable-next-line:member-ordering
  public static LOAD_PIZZAS_SUCCESS = `${Pizzas.reducerName}_LOAD_PIZZAS_SUCCESS`;
  private static loadPizzasSuccess(pizzas, type, payload) {
    return Object.assign(<IPizzas>{}, pizzas, payload);
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Pizzas.LOAD_PIZZAS_SUCCESS]: Pizzas.loadPizzasSuccess,
  };
}
