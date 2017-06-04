import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IStore } from 'app/shared/interfaces/store.interface';
import { IIngredientsTable, IIngredientsArray } from 'app/shared/states/ingredients/ingredients.interface';

export function _getIngredients(ingredientsTable: IIngredientsTable): IIngredientsArray {
  return ingredientsTable
    .allIds
    .map(ingredientId => ingredientsTable.byId[ingredientId]);
}

export function getIngredients(store$: Store<IStore>): Observable<IIngredientsArray> {
  return store$
    .select(state => state.ingredients)
    .map(ingredients => _getIngredients(ingredients));
}

export function _getNbIngredientsSelected(ingredientsTable: IIngredientsTable): number {
  return ingredientsTable
    .allIds
    .filter(ingredientId => ingredientsTable.byId[ingredientId].isSelected)
    .length;
}

export function getNbIngredientsSelected(store$: Store<IStore>): Observable<number> {
  return store$
    .select(state => state.ingredients)
    .map(ingredients => _getNbIngredientsSelected(ingredients));
}
