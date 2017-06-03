import { combineReducers, provideStore, Action } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { enableBatching } from 'redux-batched-actions';

import { IStore } from 'app/shared/interfaces/store.interface';
import { environment } from 'environments/environment';
import { uiReducer } from 'app/shared/states/ui/ui.reducer';
import { pizzasReducer } from 'app/shared/states/pizzas/pizzas.reducer';
import { pizzasCategoriesReducer } from 'app/shared/states/pizzas-categories/pizzas-categories.reducer';
import { usersReducer } from 'app/shared/states/users/users.reducer';
import { ordersReducer } from 'app/shared/states/orders/orders.reducer';
import { ingredientsReducer } from 'app/shared/states/ingredients/ingredients.reducer';

// ------------------------------------------------------------------------------

const reducers = {
  // pass your reducers here
  ui: uiReducer,
  pizzas: pizzasReducer,
  pizzasCategories: pizzasCategoriesReducer,
  users: usersReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer
};

// ------------------------------------------------------------------------------

// if environment is != from production
// use storeFreeze to avoid state mutation
const developmentReducer = compose(storeFreeze, enableBatching, combineReducers)(reducers);
const productionReducer = compose(enableBatching, combineReducers)(reducers);

// enableBatching allows us to dispatch multiple actions
// without letting the subscribers being warned between the actions
// only at the end : https://github.com/tshelburne/redux-batched-actions
// can be very handy when normalizing HTTP response
export function getRootReducer(state: IStore, action: Action): IStore {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
