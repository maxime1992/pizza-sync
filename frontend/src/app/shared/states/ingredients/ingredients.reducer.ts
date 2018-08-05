import { ActionReducer, Action } from '@ngrx/store';
import * as IngredientsActions from 'app/shared/states/ingredients/ingredients.actions';
import {
  IIngredientsTable,
  IIngredientCommon,
} from 'app/shared/states/ingredients/ingredients.interface';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const ingredientsAdapter: EntityAdapter<
  IIngredientCommon
> = createEntityAdapter<IIngredientCommon>();

export function ingredientsInitState(): IIngredientsTable {
  return ingredientsAdapter.getInitialState();
}

export function ingredientsReducer(
  ingredientsTbl = ingredientsInitState(),
  action: IngredientsActions.All
): IIngredientsTable {
  switch (action.type) {
    case IngredientsActions.LOAD_INGREDIENTS_SUCCESS: {
      return {
        ...ingredientsTbl,
        ...action.payload,
      };
    }

    case IngredientsActions.SELECT_INGREDIENT: {
      return ingredientsAdapter.updateOne(
        {
          id: action.payload.id,
          changes: { isSelected: true },
        },
        ingredientsTbl
      );
    }

    case IngredientsActions.UNSELECT_INGREDIENT: {
      return ingredientsAdapter.updateOne(
        {
          id: action.payload.id,
          changes: { isSelected: false },
        },
        ingredientsTbl
      );
    }

    default:
      return ingredientsTbl;
  }
}
