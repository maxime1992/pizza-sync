import { Store } from '@ngrx/store';

import { IStore } from './../../interfaces/store.interface';
import { IOrderWithPizzas } from './../orders/orders.interface';
import { IUserWithPizzas } from './users.interface';

export function _getUsersWithPizzas(store$: Store<IStore>) {
  return store$.select(state => {
    return { users: state.users, pizzas: state.pizzas, orders: state.orders };
  })
    .map(({ users, pizzas, orders }) => {
      return users.allIds.map(userId => {
        const ordersOfUser = orders
          .allIds
          .map(orderId => orders.byId[orderId])
          .filter(order => order.userId === userId);

        const pizzasOfUser = ordersOfUser
          .map(order => pizzas.byId[order.pizzaId]);

        return <IUserWithPizzas>Object.assign({}, users.byId[userId], <IUserWithPizzas>{
          pizzas: pizzasOfUser
        });
      });
    });
}

export function getUsersWithPizzas() {
  return _getUsersWithPizzas;
}
