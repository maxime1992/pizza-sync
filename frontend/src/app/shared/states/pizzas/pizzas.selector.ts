import { pizzasAdapter } from './pizzas.reducer';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { IPizzasTable, IPizzaWithIngredients } from './pizzas.interface';
import { IPizzaCategoryWithPizzas } from '../pizzas-categories/pizzas-categories.interface';
import { getPizzaSearch } from '../ui/ui.selector';
import { selectPizzasCategoriesAll } from '../pizzas-categories/pizzas-categories.selector';
// import { selectIngredientsEntities } from '../ingredients/ingredients.selector';
import * as removeAccents from 'remove-accents';
import {
  selectIngredientsEntities,
  getSelectedIngredientsIds,
} from '../ingredients/ingredients.selector';

const {
  selectIds: _selectPizzasIds,
  selectEntities: _selectPizzasEntities,
  selectAll: _selectPizzasAll,
  selectTotal: _selectPizzasTotal,
} = pizzasAdapter.getSelectors();

export const selectPizzasSelector = createFeatureSelector<IPizzasTable>(
  'pizzas'
);

export const selectPizzasIds = createSelector(
  selectPizzasSelector,
  _selectPizzasIds
);
export const selectPizzasEntities = createSelector(
  selectPizzasSelector,
  _selectPizzasEntities
);
export const selectPizzasAll = createSelector(
  selectPizzasSelector,
  _selectPizzasAll
);
export const selectPizzasTota = createSelector(
  selectPizzasSelector,
  _selectPizzasTotal
);
