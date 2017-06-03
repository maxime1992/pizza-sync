import { Store } from '@ngrx/store';

import { IStore } from 'app/shared/interfaces/store.interface';
import { IPizzaCategoryWithPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IPizzaWithIngredients } from 'app/shared/states/pizzas/pizzas.interface';

export function getCategoriesAndPizzas(store$: Store<IStore>) {
  return store$.select(state => {
    return {
      pizzasSearch: state.ui.pizzaSearch,
      pizzas: state.pizzas,
      pizzasCategories: state.pizzasCategories,
      ingredients: state.ingredients
    };
  })
    .distinctUntilChanged((p, n) =>
      p.pizzasSearch === n.pizzasSearch &&
      p.pizzas === n.pizzas &&
      p.pizzasCategories === n.pizzasCategories &&
      p.ingredients === n.ingredients
    )
    .map(({ pizzasSearch, pizzas, pizzasCategories, ingredients }) => {
      pizzasSearch = pizzasSearch.toLowerCase();

      return pizzasCategories
        .allIds
        .map(pizzasCategorieId => {
          const pizzasCategorie: IPizzaCategoryWithPizzas = {
            ...pizzasCategories.byId[pizzasCategorieId],
            pizzas: pizzasCategories
              .byId[pizzasCategorieId]
              .pizzasIds
              .map(pizzaId => ({
                ...pizzas.byId[pizzaId],
                ingredients: pizzas
                  .byId[pizzaId]
                  .ingredientsIds
                  .map(ingredientId => ingredients.byId[ingredientId])
              }))
              .filter(p => p.name.toLowerCase().includes(pizzasSearch))
          };

          return pizzasCategorie;
        })
        .filter(pizzasCategorie => pizzasCategorie.pizzas.length);
    });
}
