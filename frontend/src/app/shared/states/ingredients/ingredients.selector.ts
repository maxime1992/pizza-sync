import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import {
  IIngredientCommon,
  IIngredientsTable,
} from 'app/shared/states/ingredients/ingredients.interface';
import { ingredientsAdapter } from './ingredients.reducer';

const {
  selectIds: _selectIngredientsIds,
  selectEntities: _selectIngredientsEntities,
  selectAll: _selectIngredientsAll,
  selectTotal: _selectIngredientsTotal,
} = ingredientsAdapter.getSelectors();

export const selectIngredientsState = createFeatureSelector<IIngredientsTable>(
  'ingredients'
);

export const selectIngredientsIds = createSelector(
  selectIngredientsState,
  _selectIngredientsIds
);
export const selectIngredientsEntities = createSelector(
  selectIngredientsState,
  _selectIngredientsEntities
);
export const selectIngredientsAll = createSelector(
  selectIngredientsState,
  _selectIngredientsAll
);
export const selectIngredientsTotal = createSelector(
  selectIngredientsState,
  _selectIngredientsTotal
);

export const getSelectedIngredientsIds: MemoizedSelector<
  object,
  string[]
> = createSelector(selectIngredientsAll, ingredients =>
  ingredients
    .filter(ingredient => ingredient.isSelected)
    .map(ingredient => ingredient.id)
);

export const getSelectedIngredients: MemoizedSelector<
  object,
  IIngredientCommon[]
> = createSelector(
  selectIngredientsEntities,
  getSelectedIngredientsIds,
  (ingredientsEntities, selectedIngredientsIds) =>
    selectedIngredientsIds.map(
      ingredientId => ingredientsEntities[ingredientId]
    )
);

export const getNbIngredientsSelected = createSelector(
  getSelectedIngredientsIds,
  selectedIngredientsIds => selectedIngredientsIds.length
);
