import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';

export function pizzasState(): IPizzasTable {
  return {
    byId: {},
    allIds: [],
  };
}
