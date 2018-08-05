import { IPizzaWithPrice } from 'app/shared/states/pizzas/pizzas.interface';
import { EntityState } from '@ngrx/entity';

export interface IUserCommon {
  id: string;
  name: string;
  username: string;
  thumbnail: string;
  thumnail: string;
  isOnline: boolean;
}

export interface IUsersTable extends EntityState<IUserCommon> {
  isIdentifying: boolean;
  idCurrentUser: string;
}

export interface IUserWithPizzas extends IUserCommon {
  totalPrice: number;
  pizzas: IPizzaWithPrice[];
}
