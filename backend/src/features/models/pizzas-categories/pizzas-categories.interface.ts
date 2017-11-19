export interface IPizzaCategoryWithoutId {}

export interface IPizzaCategoryWithId extends IPizzaCategoryWithoutId {
  id: string;
  pizzasIds: string[];
}

export interface IPizzasCategoriesNormalized {
  byId: { [key: string]: IPizzaCategoryWithId };
  allIds: string[];
}
