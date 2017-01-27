import { Store } from '@ngrx/store';

import { IStore } from './../../interfaces/store.interface';
import { IOrderWithPizzas } from './../orders/orders.interface';
import { IUserWithPizzas } from './users.interface';
import { IPizzaWithPrice } from './../pizzas/pizzas.interface';

const pizzaSizeByIndex = ['S', 'M', 'L', 'XL'];

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
          .map(order => {
            const pizza = pizzas.byId[order.pizzaId];
            const pizzaPrice = pizza.prices[order.priceIndex];

            return <IPizzaWithPrice>Object.assign(
              {},
              pizzas.byId[order.pizzaId],
              {
                price: pizzaPrice,
                size: pizzaSizeByIndex[order.priceIndex]
              }
            );
          });

        const totalPriceOfUser = pizzasOfUser.reduce((acc, pizza) => acc + pizza.price, 0);

        return <IUserWithPizzas>Object.assign({}, users.byId[userId], <IUserWithPizzas>{
          totalPrice: totalPriceOfUser,
          pizzas: pizzasOfUser
        });
      });
    });
}

export function getUsersWithPizzas() {
  return _getUsersWithPizzas;
}
