export interface IPizzaCommon {
  id: string;
  name: string;
  ingredients: string;
  prices: [number];
}

export interface IPizzasTable {
  byId: { [key: string]: IPizzaCommon };
  allIds: string[];
}

export interface IPizzaWithPrice extends IPizzaCommon {
  orderId: string;
  price: number;
  size: string;
}
