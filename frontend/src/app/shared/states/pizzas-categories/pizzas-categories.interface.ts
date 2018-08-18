import { EntityState } from '@ngrx/entity';
import { IPizzaWithIngredients } from 'app/shared/states/pizzas/pizzas.interface';

export interface IPizzaCategoryCommon {
  id: string;
  name: string;
  pizzasIds: string[];
}

export interface IPizzasCategoriesTable
  extends EntityState<IPizzaCategoryCommon> {}

export interface IPizzaCategoryWithPizzas extends IPizzaCategoryCommon {
  pizzas: IPizzaWithIngredients[];
}
