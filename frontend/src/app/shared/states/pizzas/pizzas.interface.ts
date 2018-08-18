import { EntityState } from '@ngrx/entity';
import { IIngredientCommon } from 'app/shared/states/ingredients/ingredients.interface';

export interface IPizzaCommon {
  id: string;
  name: string;
  ingredientsIds: string[];
  prices: number[];
  imgUrl: string;
}

export interface IPizzasTable extends EntityState<IPizzaCommon> {}

export interface IPizzaWithIngredients extends IPizzaCommon {
  ingredients: IIngredientCommon[];
}

export interface IPizzaWithPrice extends IPizzaCommon {
  orderId: string;
  price: number;
  size: string;
}
