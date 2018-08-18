import { storeFreeze } from 'ngrx-store-freeze';
import { enableBatching } from 'redux-batched-actions';

import { ingredientsReducer } from 'app/shared/states/ingredients/ingredients.reducer';
import { ordersReducer } from 'app/shared/states/orders/orders.reducer';
import { pizzasCategoriesReducer } from 'app/shared/states/pizzas-categories/pizzas-categories.reducer';
import { pizzasReducer } from 'app/shared/states/pizzas/pizzas.reducer';
import { uiReducer } from 'app/shared/states/ui/ui.reducer';
import { usersReducer } from 'app/shared/states/users/users.reducer';
import { environment } from 'environments/environment';

// ------------------------------------------------------------------------------

export const reducers = {
  // pass your reducers here
  ui: uiReducer,
  pizzas: pizzasReducer,
  pizzasCategories: pizzasCategoriesReducer,
  users: usersReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer,
};

// ------------------------------------------------------------------------------

// enableBatching allows us to dispatch multiple actions
// without letting the subscribers being warned between the actions
// only at the end : https://github.com/tshelburne/redux-batched-actions
// can be very handy when normalizing HTTP response
const metaReducersDev = [storeFreeze, enableBatching];

const metaReducersProd = [enableBatching];

// if environment is != from production
// use storeFreeze to avoid state mutation
export const metaReducers = environment.production
  ? metaReducersProd
  : metaReducersDev;
