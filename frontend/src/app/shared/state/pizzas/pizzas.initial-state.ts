import { IPizzasTable } from './pizzas.interface';

export function pizzasState(): IPizzasTable {
  return {
    byId: { },
    allIds: []
  };
};
