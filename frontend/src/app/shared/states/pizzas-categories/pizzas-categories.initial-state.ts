import { IPizzasCategoriesTable } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';

export function pizzasCategoriesState(): IPizzasCategoriesTable {
  return {
    byId: {},
    allIds: [],
  };
}
