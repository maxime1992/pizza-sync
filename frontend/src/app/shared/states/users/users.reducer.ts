import { ActionReducer, Action } from '@ngrx/store';

import * as UsersActions from 'app/shared/states/users/users.actions';
import { usersState } from 'app/shared/states/users/users.initial-state';
import { IUsersTable } from 'app/shared/states/users/users.interface';

export function usersReducer(
  usersTbl = usersState(),
  action: UsersActions.All
): IUsersTable {
  switch (action.type) {
    case UsersActions.LOAD_USERS_SUCCESS: {
      return {
        ...usersTbl,
        ...action.payload,
      };
    }

    case UsersActions.IDENTIFICATION: {
      return {
        ...usersTbl,
        isIdentifying: true,
      };
    }

    case UsersActions.IDENTIFICATION_SUCCESS: {
      return {
        ...usersTbl,
        isIdentifying: false,
        idCurrentUser: action.payload,
      };
    }

    case UsersActions.ADD_USER_SUCCESS: {
      return {
        ...usersTbl,
        byId: {
          ...usersTbl.byId,
          [action.payload.id]: {
            ...action.payload,
            isOnline: true,
          },
        },
        allIds: [
          ...Array.from(new Set([...usersTbl.allIds, action.payload.id])),
        ],
      };
    }

    case UsersActions.SET_USER_ONLINE: {
      return {
        ...usersTbl,
        byId: {
          ...usersTbl.byId,
          [action.payload.id]: {
            ...usersTbl.byId[action.payload.id],
            isOnline: true,
          },
        },
      };
    }

    case UsersActions.SET_USER_OFFLINE: {
      return {
        ...usersTbl,
        byId: {
          ...usersTbl.byId,
          [action.payload.id]: {
            ...usersTbl.byId[action.payload.id],
            isOnline: false,
          },
        },
      };
    }

    default:
      return usersTbl;
  }
}
