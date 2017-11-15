export interface IIngredientCommon {
  id: string;
  name: string;
  isSelected: boolean;
  isSelectable: boolean;
}

export interface IIngredientsTable {
  byId: { [key: string]: IIngredientCommon };
  allIds: string[];
}

// tslint:disable:no-empty-interface
export interface IIngredientsArray extends Array<IIngredientCommon> {}
