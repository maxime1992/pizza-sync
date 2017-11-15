import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IStore } from 'app/shared/interfaces/store.interface';
import {
  IIngredientsTable,
  IIngredientsArray,
} from 'app/shared/states/ingredients/ingredients.interface';
import { getCategoriesAndPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.selector';

export function _getIngredients(
  ingredientsTable: IIngredientsTable
): IIngredientsArray {
  return ingredientsTable.allIds.map(
    ingredientId => ingredientsTable.byId[ingredientId]
  );
}

export function getIngredients(
  store$: Store<IStore>
): Observable<IIngredientsArray> {
  return store$
    .select(state => state.ingredients)
    .map(ingredients => _getIngredients(ingredients))
    .combineLatest(getIngredientsOfFilteredPizzas(store$))
    .map(([ingredients, ingredientsOfFilteredPizzas]) =>
      ingredients.map(ingredient => ({
        ...ingredient,
        isSelectable: ingredientsOfFilteredPizzas.includes(ingredient.id),
      }))
    );
}

export function _getNbIngredientsSelected(
  ingredientsTable: IIngredientsTable
): number {
  return ingredientsTable.allIds.filter(
    ingredientId => ingredientsTable.byId[ingredientId].isSelected
  ).length;
}

export function getNbIngredientsSelected(
  store$: Store<IStore>
): Observable<number> {
  return store$
    .select(state => state.ingredients)
    .map(ingredients => _getNbIngredientsSelected(ingredients));
}

export function _getIngredientsSelected(
  ingredientsTable: IIngredientsTable
): IIngredientsArray {
  return ingredientsTable.allIds
    .map(ingredientId => ingredientsTable.byId[ingredientId])
    .filter(ingredient => ingredient.isSelected);
}

export function getIngredientsSelected(
  store$: Store<IStore>
): Observable<IIngredientsArray> {
  return store$
    .select(state => state.ingredients)
    .map(ingredients => _getIngredientsSelected(ingredients));
}

export function getIngredientsOfFilteredPizzas(
  store$: Store<IStore>
): Observable<string[]> {
  return getCategoriesAndPizzas(store$).map(categoriesAndPizzas => {
    const ingredientsOfFilteredPizzas = new Set();

    categoriesAndPizzas.forEach(categorieAndPizzas => {
      categorieAndPizzas.pizzas.forEach(pizza => {
        pizza.ingredientsIds.forEach(ingredientId =>
          ingredientsOfFilteredPizzas.add(ingredientId)
        );
      });
    });

    return Array.from(ingredientsOfFilteredPizzas);
  });
}
