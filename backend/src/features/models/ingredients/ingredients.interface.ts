export interface IIngredientWithoutId {
  name: string;
}

export interface IIngredientWithId extends IIngredientWithoutId {
  id: string;
}

export interface IIngredientsNormalized {
  byId: { [key: string]: IIngredientWithId };
  allIds: string[];
}
