import { IUi } from 'app/shared/states/ui/ui.interface';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';
import { IPizzasCategoriesTable } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IUsersTable } from 'app/shared/states/users/users.interface';
import { IOrdersTable } from 'app/shared/states/orders/orders.interface';
import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';

export interface IStore {
  ui: IUi;
  pizzas: IPizzasTable;
  pizzasCategories: IPizzasCategoriesTable;
  users: IUsersTable;
  orders: IOrdersTable;
  ingredients: IIngredientsTable;
}
