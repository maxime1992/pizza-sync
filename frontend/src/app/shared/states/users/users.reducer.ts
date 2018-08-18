import { ActionReducer, Action } from '@ngrx/store';
import * as UsersActions from 'app/shared/states/users/users.actions';
import {
  IUsersTable,
  IUserCommon,
} from 'app/shared/states/users/users.interface';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const usersAdapter: EntityAdapter<IUserCommon> = createEntityAdapter<
  IUserCommon
>();

export function usersInitState(): IUsersTable {
  return usersAdapter.getInitialState({
    isIdentifying: false,
    idCurrentUser: '',
  });
}

export function usersReducer(
  usersTbl = usersInitState(),
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
      return usersAdapter.upsertOne(
        {
          ...action.payload,
          isOnline: true,
        },
        usersTbl
      );
    }

    case UsersActions.SET_USER_ONLINE: {
      return usersAdapter.updateOne(
        {
          id: action.payload.id,
          changes: {
            isOnline: true,
          },
        },
        usersTbl
      );
    }

    case UsersActions.SET_USER_OFFLINE: {
      return usersAdapter.updateOne(
        {
          id: action.payload.id,
          changes: {
            isOnline: false,
          },
        },
        usersTbl
      );
    }

    default:
      return usersTbl;
  }
}
