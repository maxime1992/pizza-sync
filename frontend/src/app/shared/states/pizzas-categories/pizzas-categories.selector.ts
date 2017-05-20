import { Store } from '@ngrx/store';

import { IStore } from 'app/shared/interfaces/store.interface';
import { IPizzaCategoryWithPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';

export function _getCategoriesAndPizzas(store$: Store<IStore>) {
  return store$.select(state => {
    return { pizzas: state.pizzas, pizzasCategories: state.pizzasCategories };
  })
    .distinctUntilChanged((p, n) =>
      p.pizzas === n.pizzas &&
      p.pizzasCategories === n.pizzasCategories
    )
    .map(({ pizzas, pizzasCategories }) => {
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
            }
          };

          return pizzasCategorie;
        });
    });
}

export function getCategoriesAndPizzas() {
  return _getCategoriesAndPizzas;
}
