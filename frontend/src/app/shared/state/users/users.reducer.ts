import { ActionReducer, Action } from '@ngrx/store';

import { IUsers } from './users.interface';
import { usersState } from './users.initial-state';


export class Users {
  private static reducerName = 'USERS_REDUCER';

  public static reducer(users = usersState(), {type, payload}: Action) {
    if (typeof Users.mapActionsToMethod[type] === 'undefined') {
      return users;
    }

    return Users.mapActionsToMethod[type](users, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_USERS_SUCCESS = `${Users.reducerName}_LOAD_USERS_SUCCESS`;
  private static loadUsersSuccess(users, type, payload) {
    return Object.assign(<IUsers>{}, users, payload);
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Users.LOAD_USERS_SUCCESS]: Users.loadUsersSuccess
  };
}
