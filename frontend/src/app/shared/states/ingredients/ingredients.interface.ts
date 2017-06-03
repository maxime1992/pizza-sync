export interface IIngredientCommon {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface IIngredientsTable {
  byId: { [key: string]: IIngredientCommon };
  allIds: string[];
}

export interface IIngredientsArray extends Array<IIngredientCommon> { }
