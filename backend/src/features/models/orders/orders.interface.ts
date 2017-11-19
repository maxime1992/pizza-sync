export interface IOrderWithoutId {
  pizzaId: string;
  priceIndex: number;
  userId: string;
}

export interface IOrderWithId extends IOrderWithoutId {
  id: string;
}

export interface IOrdersNormalized {
  byId: { [key: string]: IOrderWithId };
  allIds: string[];
}
