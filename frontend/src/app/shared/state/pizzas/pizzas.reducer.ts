import { ActionReducer, Action } from '@ngrx/store';

import { pizzasState } from './pizzas.initial-state';
import { IPizzasTable } from './pizzas.interface';

export class Pizzas {
  private static reducerName = 'PIZZAS_REDUCER';

  public static reducer(pizzasTbl = pizzasState(), {type, payload}: Action) {
    if (typeof Pizzas.mapActionsToMethod[type] === 'undefined') {
      return pizzasTbl;
    }

    return Pizzas.mapActionsToMethod[type](pizzasTbl, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_PIZZAS = `${Pizzas.reducerName}_LOAD_PIZZAS`;

  // tslint:disable-next-line:member-ordering
  public static LOAD_PIZZAS_SUCCESS = `${Pizzas.reducerName}_LOAD_PIZZAS_SUCCESS`;
  private static loadPizzasSuccess(pizzasTbl, type, payload) {
    return <IPizzasTable>{ ...pizzasTbl, ...payload };
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Pizzas.LOAD_PIZZAS_SUCCESS]: Pizzas.loadPizzasSuccess,
  };
}
