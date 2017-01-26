import { IUi } from './../state/ui/ui.interface';
import { IPizzas } from './../state/pizzas/pizzas.interface';
import { IPizzasCategories } from './../state/pizzas-categories/pizzas-categories.interface';

export interface IStore {
  ui: IUi;
  pizzas: IPizzas;
  pizzasCategories: IPizzasCategories;
}
