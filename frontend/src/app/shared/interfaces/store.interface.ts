import { IUi } from './../state/ui/ui.interface';
import { IPizzasTable } from './../state/pizzas/pizzas.interface';
import { IPizzasCategoriesTable } from './../state/pizzas-categories/pizzas-categories.interface';
import { IUsersTable } from './../state/users/users.interface';
import { IOrdersTable } from './../state/orders/orders.interface';

export interface IStore {
  ui: IUi;
  pizzas: IPizzasTable;
  pizzasCategories: IPizzasCategoriesTable;
  users: IUsersTable;
  orders: IOrdersTable;
}
