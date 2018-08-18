import { EntityState } from '@ngrx/entity';

export interface IIngredientCommon {
  id: string;
  name: string;
  isSelected: boolean;
  isSelectable: boolean;
}

export interface IIngredientsTable extends EntityState<IIngredientCommon> {}
