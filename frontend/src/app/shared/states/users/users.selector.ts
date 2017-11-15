import { Store } from '@ngrx/store';

import { IStore } from 'app/shared/interfaces/store.interface';
import {
  IOrderWithPizzas,
  IOrdersTable,
} from 'app/shared/states/orders/orders.interface';
import {
  IUserWithPizzas,
  IUsersTable,
} from 'app/shared/states/users/users.interface';
import {
  IPizzaWithPrice,
  IPizzasTable,
} from 'app/shared/states/pizzas/pizzas.interface';

const pizzaSizeByIndex = ['S', 'M', 'L', 'XL'];

export function _getFullOrder(
  users: IUsersTable,
  pizzas: IPizzasTable,
  orders: IOrdersTable
) {
  const usersWithPizzas = users.allIds.map(userId => {
    const ordersOfUser = orders.allIds
      .map(orderId => orders.byId[orderId])
      .filter(order => order.userId === userId);

    const pizzasOfUser = ordersOfUser.map(order => {
      const pizza = pizzas.byId[order.pizzaId];
      const pizzaPrice = pizza.prices[order.priceIndex];

      return <IPizzaWithPrice>{
        ...pizzas.byId[order.pizzaId],

        orderId: order.id,
        isBeingRemoved: order.isBeingRemoved,
        price: pizzaPrice,
        size: pizzaSizeByIndex[order.priceIndex],
      };
    });

    const totalPriceOfUser = pizzasOfUser.reduce(
      (acc, pizza) => acc + pizza.price,
      0
    );

    return <IUserWithPizzas>{
      ...users.byId[userId],
      ...(<IUserWithPizzas>{
        totalPrice: totalPriceOfUser,
        pizzas: pizzasOfUser,
      }),
    };
  });

  const totalPrice = usersWithPizzas.reduce(
    (acc, user) => acc + user.totalPrice,
    0
  );

  return {
    users: usersWithPizzas,
    totalPrice,
  };
}

export function getFullOrder(store$: Store<IStore>) {
  return store$
    .select(state => {
      return { users: state.users, pizzas: state.pizzas, orders: state.orders };
    })
    .distinctUntilChanged(
      (p, n) =>
        p.users === n.users &&
        p.pizzas === n.pizzas &&
        p.orders.byId === n.orders.byId
    )
    .map(({ users, pizzas, orders }) => _getFullOrder(users, pizzas, orders));
}

export function getFullOrderCsvFormat({
  users,
}: {
  users: IUserWithPizzas[];
  totalPrice: number;
}) {
  const header = [
    'Person name',
    'Pizza',
    'Size',
    'Price',
    'Pay',
    'Change',
    'Done ✓ or not yet ✕',
  ];

  // the row index starts at 2 because in a speadsheet, it starts at 1 and we'll have the header
  let i = 2;

  const data = users.reduce((acc, user) => {
    user.pizzas.forEach(pizza => {
      acc.push([
        user.username,
        pizza.name,
        pizza.size,
        pizza.price,
        '0',
        `=E${i}-D${i}`,
        '✕',
      ]);

      i++;
    });

    return acc;
  }, []);

  return [header, ...data];
}
