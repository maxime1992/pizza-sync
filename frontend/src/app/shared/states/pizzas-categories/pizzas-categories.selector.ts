import { map, distinctUntilChanged } from 'rxjs/operators';
import {
  Store,
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'app/shared/interfaces/store.interface';
import {
  IPizzaCategoryWithPizzas,
  IPizzasCategoriesTable,
} from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IPizzaWithIngredients } from 'app/shared/states/pizzas/pizzas.interface';
import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';
import { pizzasCategoriesAdapter } from './pizzas-categories.reducer';
import {
  selectIngredientsAll,
  selectIngredientsEntities,
  getSelectedIngredientsIds,
} from '../ingredients/ingredients.selector';
import {
  selectPizzasAll,
  selectPizzasEntities,
} from '../pizzas/pizzas.selector';
import { getPizzaSearch } from '../ui/ui.selector';
import * as removeAccents from 'remove-accents';

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
