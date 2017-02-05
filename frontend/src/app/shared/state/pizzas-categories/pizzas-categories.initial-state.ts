import { IPizzasCategoriesTable } from './pizzas-categories.interface';

export function pizzasCategoriesState(): IPizzasCategoriesTable {
  return {
    byId: { },
    allIds: []
  };
};
