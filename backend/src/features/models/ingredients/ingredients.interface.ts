export interface IIngredientWithoutId {
  name: string;
}

export interface IIngredientWithId extends IIngredientWithoutId {
  id: string;
}

export interface IIngredientsNormalized {
  entities: { [key: string]: IIngredientWithId };
  ids: string[];
}
