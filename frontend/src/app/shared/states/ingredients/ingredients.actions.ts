import { Action } from '@ngrx/store';

import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';

export const LOAD_INGREDIENTS_SUCCESS = '[Ingredients] Load ingredients success';
export class LoadIngredientsSuccess implements Action {
  readonly type = LOAD_INGREDIENTS_SUCCESS;

  constructor(public payload: IIngredientsTable) { }
}

export type All = LoadIngredientsSuccess;
