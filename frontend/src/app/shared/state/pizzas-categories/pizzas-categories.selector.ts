import { Store } from '@ngrx/store';

import { IStore } from './../../interfaces/store.interface';
import { IPizzaCategoryWithPizzas } from './pizzas-categories.interface';

export function _getCategoriesAndPizzas(store$: Store<IStore>) {
  return store$.select(state => {
    return { pizzas: state.pizzas, pizzasCategories: state.pizzasCategories };
  })
    .distinctUntilChanged((p, n) =>
      p.pizzas === n.pizzas &&
      p.pizzasCategories === n.pizzasCategories
    )
    .map(({pizzas, pizzasCategories}) => {
      const rslt = pizzasCategories.allIds.map(pizzasCategorieId => {
        const pizzasCategorie = <IPizzaCategoryWithPizzas>Object.assign(
          {},
          pizzasCategories.byId[pizzasCategorieId]
        );

        pizzasCategorie.pizzas = pizzas
          .allIds
          .map(pizzaId => pizzas.byId[pizzaId])
          .filter(pizza => pizza.category === pizzasCategorieId);

        return pizzasCategorie;
      });

      return rslt;
    });
}

export function getCategoriesAndPizzas() {
  return _getCategoriesAndPizzas;
}
