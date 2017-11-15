import { IUsersTable } from 'app/shared/states/users/users.interface';

export function usersState(): IUsersTable {
  return {
    isIdentifying: false,
    idCurrentUser: '',

    byId: {},
    allIds: [],
  };
}
