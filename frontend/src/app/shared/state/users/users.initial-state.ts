import { IUsersTable } from './users.interface';

export function usersState(): IUsersTable {
  return {
    isIdentifying: false,
    idCurrentUser: '',

    byId: { },
    allIds: []
  };
};
