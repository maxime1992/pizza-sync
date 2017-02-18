import { ActionReducer, Action } from '@ngrx/store';

import { IUsersTable, IUserCommon } from './users.interface';
import { usersState } from './users.initial-state';


export class Users {
  private static reducerName = 'USERS_REDUCER';

  public static reducer(usersTbl = usersState(), {type, payload}: Action) {
    if (typeof Users.mapActionsToMethod[type] === 'undefined') {
      return usersTbl;
    }

    return Users.mapActionsToMethod[type](usersTbl, type, payload);
  }

  // tslint:disable-next-line:member-ordering
  public static LOAD_USERS_SUCCESS = `${Users.reducerName}_LOAD_USERS_SUCCESS`;
  private static loadUsersSuccess(usersTbl, type, payload) {
    return <IUsersTable>{ ...usersTbl, ...payload };
  }

  // tslint:disable-next-line:member-ordering
  public static IDENTIFICATION = `${Users.reducerName}_IDENTIFICATION`;
  private static identification(usersTbl, type, payload) {
    return <IUsersTable>{ ...usersTbl, ...<IUsersTable>{ isIdentifying: true } };
  }

  // tslint:disable-next-line:member-ordering
  public static IDENTIFICATION_SUCCESS = `${Users.reducerName}_IDENTIFICATION_SUCCESS`;
  private static identificationSuccess(usersTbl, type, payload) {
    return <IUsersTable>{
      ...usersTbl,
      ...<IUsersTable>{ isIdentifying: false, idCurrentUser: payload }
    };
  }

  // tslint:disable-next-line:member-ordering
  public static ADD_USER_SUCCESS = `${Users.reducerName}_ADD_USER_SUCCESS`;
  private static addUserSuccess(usersTbl, type, payload) {
    return <IUsersTable>{
      ...usersTbl,
      ...<IUsersTable>{
        byId: {
          ...usersTbl.byId,
          [payload.id]: {
            ...payload,
            ...<IUserCommon>{ isOnline: true }
          },
        },
        allIds: [...Array.from(new Set([...usersTbl.allIds, payload.id]))]
      }
    };
  }

  // tslint:disable-next-line:member-ordering
  public static SET_USER_ONLINE = `${Users.reducerName}_SET_USER_ONLINE`;
  private static setUserOnline(users, type, payload, online = true) {
    return <IUsersTable>{
      ...users,
      ...<IUsersTable>{
        byId: {
          ...users.byId,
          [payload.id]: {
            ...users.byId[payload.id],
            ...<IUserCommon>{ isOnline: online }
          }
        }
      }
    };
  }

  // tslint:disable-next-line:member-ordering
  public static SET_USER_OFFLINE = `${Users.reducerName}_SET_USER_OFFLINE`;
  private static setUserOffline(users, type, payload, online = true) {
    return Users.setUserOnline(users, type, payload, false);
  }

  // ---------------------------------------------------------------

  // tslint:disable-next-line:member-ordering
  private static mapActionsToMethod = {
    [Users.LOAD_USERS_SUCCESS]: Users.loadUsersSuccess,
    [Users.IDENTIFICATION]: Users.identification,
    [Users.IDENTIFICATION_SUCCESS]: Users.identificationSuccess,
    [Users.ADD_USER_SUCCESS]: Users.addUserSuccess,
    [Users.SET_USER_ONLINE]: Users.setUserOnline,
    [Users.SET_USER_OFFLINE]: Users.setUserOffline
  };
}
