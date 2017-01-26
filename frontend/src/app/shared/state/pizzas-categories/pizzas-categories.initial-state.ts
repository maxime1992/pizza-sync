import { IPizzasCategories } from './pizzas-categories.interface';

export function pizzasCategoriesState(): IPizzasCategories {
  return {
    byId: { },
    allIds: []
  };
};
