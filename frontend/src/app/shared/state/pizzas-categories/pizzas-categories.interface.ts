import { IPizza } from './../pizzas/pizzas.interface';

export interface IPizzaCategory {
  id: string;
  name: string;
}

export interface IPizzasCategories {
  byId: { [key: string]: IPizzaCategory };
  allIds: string[];
}

export interface IPizzaCategoryWithPizzas extends IPizzaCategory {
  pizzas: IPizza[];
}
