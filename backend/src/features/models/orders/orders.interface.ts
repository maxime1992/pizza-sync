export interface IOrderWithoutId {
  pizzaId: string;
  priceIndex: number;
  userId: string;
}

export interface IOrderWithId extends IOrderWithoutId {
  id: string;
}

export interface IOrdersNormalized {
  entities: { [key: string]: IOrderWithId };
  ids: string[];
}
