import { Action } from '@ngrx/store';

import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';

export const LOAD_PIZZAS = '[Pizzas] Load pizzas';
export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;

  constructor() {}
}

export const LOAD_PIZZAS_SUCCESS = '[Pizzas] Load pizzas success';
export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;

  constructor(public payload: IPizzasTable) {}
}

export type All = LoadPizzas | LoadPizzasSuccess;
