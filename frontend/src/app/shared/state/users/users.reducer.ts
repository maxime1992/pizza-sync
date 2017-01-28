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

  // tslint:disable-next-line:member-ordering
  public static IDENTIFICATION = `${Users.reducerName}_IDENTIFICATION`;
  private static identification(users, type, payload) {
    return Object.assign(<IUsers>{}, users, <IUsers>{ isIdentifying: true });
  }

  // tslint:disable-next-line:member-ordering
  public static IDENTIFICATION_SUCCESS = `${Users.reducerName}_IDENTIFICATION_SUCCESS`;
  private static identificationSuccess(users, type, payload) {
    return Object.assign(<IUsers>{}, users, <IUsers>{ isIdentifying: false });
  }

  // tslint:disable-next-line:member-ordering
  public static ADD_USER_SUCCESS = `${Users.reducerName}_ADD_USER_SUCCESS`;
  private static addUserSuccess(users, type, payload) {
    return Object.assign(<IUsers>{}, users, <IUsers>{
      byId: Object.assign({}, users.byId, { [payload.id]: payload }),
      allIds: [...users.allIds, payload.id]
    });
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Users.LOAD_USERS_SUCCESS]: Users.loadUsersSuccess,
    [Users.IDENTIFICATION]: Users.identification,
    [Users.IDENTIFICATION_SUCCESS]: Users.identificationSuccess,
    [Users.ADD_USER_SUCCESS]: Users.addUserSuccess
  };
}
