import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as removeAccents from 'remove-accents';

import { IStore } from 'app/shared/interfaces/store.interface';
import { IPizzaCategoryWithPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IPizzaWithIngredients } from 'app/shared/states/pizzas/pizzas.interface';
import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';

export function getSelectedIngredientsIds(
  ingredients: IIngredientsTable
): string[] {
  return ingredients.allIds.filter(
    ingredientId => ingredients.byId[ingredientId].isSelected
  );
}

export function doesPizzaContainsAllSelectedIngredients(
  selectedIngredientsIds: string[],
  pizza: IPizzaWithIngredients
): boolean {
  return selectedIngredientsIds.every(ingredientId =>
    pizza.ingredientsIds.includes(ingredientId)
  );
}

export function getCategoriesAndPizzas(
  store$: Store<IStore>
): Observable<IPizzaCategoryWithPizzas[]> {
  return store$
    .select(state => {
      return {
        pizzasSearch: state.ui.pizzaSearch,
        pizzas: state.pizzas,
        pizzasCategories: state.pizzasCategories,
        ingredients: state.ingredients,
      };
    })
    .distinctUntilChanged(
      (p, n) =>
        p.pizzasSearch === n.pizzasSearch &&
        p.pizzas === n.pizzas &&
        p.pizzasCategories === n.pizzasCategories &&
        p.ingredients === n.ingredients
    )
    .map(({ pizzasSearch, pizzas, pizzasCategories, ingredients }) => {
      pizzasSearch = removeAccents(pizzasSearch.toLowerCase());
      const selectedIngredientsIds = getSelectedIngredientsIds(ingredients);

      return pizzasCategories.allIds
        .map(pizzasCategorieId => {
          const pizzasCategorie: IPizzaCategoryWithPizzas = {
            ...pizzasCategories.byId[pizzasCategorieId],
            pizzas: pizzasCategories.byId[pizzasCategorieId].pizzasIds
              .map(pizzaId => ({
                ...pizzas.byId[pizzaId],
                ingredients: pizzas.byId[pizzaId].ingredientsIds.map(
                  ingredientId => ingredients.byId[ingredientId]
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
    });
}
