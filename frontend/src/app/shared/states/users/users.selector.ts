import { map, distinctUntilChanged } from 'rxjs/operators';
import {
  Store,
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
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
import { usersAdapter } from './users.reducer';
import { selectOrdersAll } from '../orders/orders.selector';
import { selectPizzasEntities } from '../pizzas/pizzas.selector';

const pizzaSizeByIndex = ['S', 'M', 'L', 'XL'];

const {
  selectIds: _selectUsersIds,
  selectEntities: _selectUsersEntities,
  selectAll: _selectUsersAll,
  selectTotal: _selectUsersTotal,
} = usersAdapter.getSelectors();

export const selectUsersState = createFeatureSelector<IUsersTable>('users');

export const selectUsersIds = createSelector(selectUsersState, _selectUsersIds);

export const selectUsersEntities = createSelector(
  selectUsersState,
  _selectUsersEntities
);

export const selectUsersAll = createSelector(selectUsersState, _selectUsersAll);

export const selectUsersTotal = createSelector(
  selectUsersState,
  _selectUsersTotal
);

export const getCurrentUser = createSelector(
  selectUsersState,
  userState => userState.idCurrentUser
);

export const getFullOrder: MemoizedSelector<
  object,
  {
    users: IUserWithPizzas[];
    totalPrice: number;
  }
> = createSelector(
  selectUsersAll,
  selectPizzasEntities,
  selectOrdersAll,
  (users, pizzasEntities, orders) => {
    const usersWithPizzas = users.map(user => {
      const ordersOfUser = orders.filter(order => order.userId === user.id);

      const pizzasOfUser = ordersOfUser.map(order => {
        const pizza = pizzasEntities[order.pizzaId];
        const pizzaPrice = pizza.prices[order.priceIndex];

        return <IPizzaWithPrice>{
          ...pizzasEntities[order.pizzaId],

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
        ...user,
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
);

export const getFullOrderCsvFormat = createSelector(
  getFullOrder,
  ({ users }) => {
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
);
