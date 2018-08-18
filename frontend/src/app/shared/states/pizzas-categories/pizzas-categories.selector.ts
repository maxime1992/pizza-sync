import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  IPizzasCategoriesTable,
} from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { pizzasCategoriesAdapter } from './pizzas-categories.reducer';

const {
  selectIds: _selectPizzasCategoriesIds,
  selectEntities: _selectPizzasCategoriesEntities,
  selectAll: _selectPizzasCategoriesAll,
  selectTotal: _selectPizzasCategoriesTotal,
} = pizzasCategoriesAdapter.getSelectors();

export const selectPizzasCategoriesState = createFeatureSelector<
  IPizzasCategoriesTable
>('pizzasCategories');

export const selectPizzasCategoriesIds = createSelector(
  selectPizzasCategoriesState,
  _selectPizzasCategoriesIds
);
export const selectPizzasCategoriesEntities = createSelector(
  selectPizzasCategoriesState,
  _selectPizzasCategoriesEntities
);
export const selectPizzasCategoriesAll = createSelector(
  selectPizzasCategoriesState,
  _selectPizzasCategoriesAll
);
export const selectPizzasCategoriesTotal = createSelector(
  selectPizzasCategoriesState,
  _selectPizzasCategoriesTotal
);
