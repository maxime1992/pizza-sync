import {
  createSelector,
  createFeatureSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { IUi } from './ui.interface';
import { IPizzaWithIngredients } from '../pizzas/pizzas.interface';
import { IPizzaCategoryWithPizzas } from '../pizzas-categories/pizzas-categories.interface';
import { selectPizzasEntities } from '../pizzas/pizzas.selector';
import {
  getSelectedIngredientsIds,
  selectIngredientsEntities,
  selectIngredientsAll,
} from '../ingredients/ingredients.selector';
import { selectPizzasCategoriesAll } from '../pizzas-categories/pizzas-categories.selector';
import * as removeAccents from 'remove-accents';
import { IIngredientCommon } from '../ingredients/ingredients.interface';

export const selectUiState = createFeatureSelector<IUi>('ui');

export const getPizzaSearch = createSelector(
  selectUiState,
  ui => ui.pizzaSearch
);

export const getIsFilterIngredientVisible = createSelector(
  selectUiState,
  ui => ui.isFilterIngredientVisible
);

export const getIsDialogIdentificationOpen = createSelector(
  selectUiState,
  ui => ui.isDialogIdentificationOpen
);

export const getIsDialogOrderSummaryOpen = createSelector(
  selectUiState,
  ui => ui.isDialogOrderSummaryOpen
);

function doesPizzaContainsAllSelectedIngredients(
  selectedIngredientsIds: string[],
  pizza: IPizzaWithIngredients
): boolean {
  return selectedIngredientsIds.every(ingredientId =>
    pizza.ingredientsIds.includes(ingredientId)
  );
}

export const getCategoriesAndPizzas: MemoizedSelector<
  object,
  IPizzaCategoryWithPizzas[]
> = createSelector(
  getPizzaSearch,
  selectPizzasEntities,
  selectPizzasCategoriesAll,
  getSelectedIngredientsIds,
  selectIngredientsEntities,
  (
    pizzasSearch,
    pizzasEntities,
    pizzasCategoriesAll,
    selectedIngredientsIds,
    ingredientsEntities
  ) => {
    pizzasSearch = removeAccents(pizzasSearch.toLowerCase());

    return pizzasCategoriesAll
      .map(pizzasCategory => {
        const pizzasCategorie: IPizzaCategoryWithPizzas = {
          ...pizzasCategory,
          pizzas: pizzasCategory.pizzasIds
            .map(pizzaId => ({
              ...pizzasEntities[pizzaId],
              ingredients: pizzasEntities[pizzaId].ingredientsIds.map(
                ingredientId => ingredientsEntities[ingredientId]
              ),
            }))
            .filter(
              p =>
                removeAccents(p.name.toLowerCase()).includes(pizzasSearch) &&
                doesPizzaContainsAllSelectedIngredients(
                  selectedIngredientsIds,
                  p
                )
            ),
        };

        return pizzasCategorie;
      })
      .filter(pizzasCategorie => pizzasCategorie.pizzas.length);
  }
);

const getIngredientsOfFilteredPizzas: MemoizedSelector<
  object,
  string[]
> = createSelector(getCategoriesAndPizzas, categoriesAndPizzas => {
  const ingredientsOfFilteredPizzas: Set<string> = new Set();

  categoriesAndPizzas.forEach(categorieAndPizzas => {
    categorieAndPizzas.pizzas.forEach(pizza => {
      pizza.ingredientsIds.forEach(ingredientId =>
        ingredientsOfFilteredPizzas.add(ingredientId)
      );
    });
  });

  return Array.from(ingredientsOfFilteredPizzas);
});

export const getIngredients: MemoizedSelector<
  object,
  IIngredientCommon[]
> = createSelector(
  selectIngredientsAll,
  getIngredientsOfFilteredPizzas,
  (ingredients, ingredientsOfFilteredPizzas) => {
    return ingredients.map(ingredient => ({
      ...ingredient,
      isSelectable: ingredientsOfFilteredPizzas.includes(ingredient.id),
    }));
  }
);
