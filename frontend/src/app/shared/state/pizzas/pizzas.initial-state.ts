import { IPizzas } from './pizzas.interface';

export function pizzasState(): IPizzas {
  return {
    byId: { },
    allIds: []
  };
};
