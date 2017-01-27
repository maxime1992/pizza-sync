import { IUi } from './../state/ui/ui.interface';
import { IPizzas } from './../state/pizzas/pizzas.interface';
import { IPizzasCategories } from './../state/pizzas-categories/pizzas-categories.interface';
import { IUsers } from './../state/users/users.interface';
import { IOrders } from './../state/orders/orders.interface';

export interface IStore {
  ui: IUi;
  pizzas: IPizzas;
  pizzasCategories: IPizzasCategories;
  users: IUsers;
  orders: IOrders;
}
