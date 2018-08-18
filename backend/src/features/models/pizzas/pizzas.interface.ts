export interface IPizzaWithoutId {
  name: string;
  ingredientsIds: string[];
  prices: number[];
  imgUrl: string;
}

export interface IPizzaWithId extends IPizzaWithoutId {
  id: string;
}

export interface IPizzasNormalized {
  entities: { [key: string]: IPizzaWithId };
  ids: string[];
}
