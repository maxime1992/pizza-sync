export interface IPizzaCategoryWithoutId {}

export interface IPizzaCategoryWithId extends IPizzaCategoryWithoutId {
  id: string;
  pizzasIds: string[];
}

export interface IPizzasCategoriesNormalized {
  entities: { [key: string]: IPizzaCategoryWithId };
  ids: string[];
}
