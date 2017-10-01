import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';

export function ingredientsState(): IIngredientsTable {
  return {
    byId: {},
    allIds: [],
  };
}
