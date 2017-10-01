import { Action } from '@ngrx/store';

import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';

export const LOAD_INGREDIENTS_SUCCESS =
  '[Ingredients] Load ingredients success';
export class LoadIngredientsSuccess implements Action {
  readonly type = LOAD_INGREDIENTS_SUCCESS;

  constructor(public payload: IIngredientsTable) {}
}

export const SELECT_INGREDIENT = '[Ingredients] Select ingredient';
export class SelectIngredient implements Action {
  readonly type = SELECT_INGREDIENT;

  constructor(public payload: { id: string }) {}
}

export const UNSELECT_INGREDIENT = '[Ingredients] Unselect ingredient';
export class UnselectIngredient implements Action {
  readonly type = UNSELECT_INGREDIENT;

  constructor(public payload: { id: string }) {}
}

export type All =
  | LoadIngredientsSuccess
  | SelectIngredient
  | UnselectIngredient;
