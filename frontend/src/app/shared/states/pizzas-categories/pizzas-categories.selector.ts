import { Store } from '@ngrx/store';

import { IStore } from 'app/shared/interfaces/store.interface';
import { IPizzaCategoryWithPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';

export function getCategoriesAndPizzas(store$: Store<IStore>) {
  return store$.select(state => {
    return {
      pizzasSearch: state.ui.pizzaSearch,
      pizzas: state.pizzas,
      pizzasCategories: state.pizzasCategories
    };
  })
    .distinctUntilChanged((p, n) =>
      p.pizzasSearch === n.pizzasSearch &&
      p.pizzas === n.pizzas &&
      p.pizzasCategories === n.pizzasCategories
    )
    .map(({ pizzasSearch, pizzas, pizzasCategories }) => {
      pizzasSearch = pizzasSearch.toLowerCase();

      return pizzasCategories
        .allIds
        .map(pizzasCategorieId => {
          const pizzasCategorie = <IPizzaCategoryWithPizzas>{
            ...pizzasCategories.byId[pizzasCategorieId],
            ...<IPizzaCategoryWithPizzas>{
              pizzas: pizzasCategories
                .byId[pizzasCategorieId]
                .pizzasIds
                .map(pizzaId => pizzas.byId[pizzaId])
                .filter(p => p.name.toLowerCase().includes(pizzasSearch))
            }
          };

          return pizzasCategorie;
        })
        .filter(pizzasCategorie => pizzasCategorie.pizzas.length);
    });
}
