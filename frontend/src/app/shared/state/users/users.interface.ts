import { IPizzaWithPrice } from './../pizzas/pizzas.interface';

export interface IUser {
  id: string;
  name: string;
  thumnail: string;
}

export interface IUsers {
  byId: { [key: string]: IUser };
  allIds: string[];
}

export interface IUserWithPizzas extends IUser {
  totalPrice: number;
  pizzas: IPizzaWithPrice[];
}
