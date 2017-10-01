import { Action } from '@ngrx/store';

import { IPizzasCategoriesTable } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';

export const LOAD_PIZZAS_CATEGORIES_SUCCESS =
  '[Pizzas categ] Load pizzas categories success';
export class LoadPizzasCategoriesSuccess implements Action {
  readonly type = LOAD_PIZZAS_CATEGORIES_SUCCESS;

  constructor(public payload: IPizzasCategoriesTable) {}
}

export type All = LoadPizzasCategoriesSuccess;
