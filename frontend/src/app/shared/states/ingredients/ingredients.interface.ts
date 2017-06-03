export interface IIngredientCommon {
  id: string;
  name: string;
}

export interface IIngredientsTable {
  byId: { [key: string]: IIngredientCommon };
  allIds: string[];
}
