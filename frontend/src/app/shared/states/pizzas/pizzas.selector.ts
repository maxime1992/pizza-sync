import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { IPizzasTable } from './pizzas.interface';
import { pizzasAdapter } from './pizzas.reducer';
// import { selectIngredientsEntities } from '../ingredients/ingredients.selector';

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
