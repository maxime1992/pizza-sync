import { IPizzaWithPrice } from './../pizzas/pizzas.interface';

export interface IUser {
  id: string;
  name: string;
  username: string;
  thumnail: string;
}

export interface IUsers {
  isIdentifying: boolean;
  idCurrentUser: string;

  byId: { [key: string]: IUser };
  allIds: string[];
}

export interface IUserWithPizzas extends IUser {
  totalPrice: number;
  pizzas: IPizzaWithPrice[];
}
