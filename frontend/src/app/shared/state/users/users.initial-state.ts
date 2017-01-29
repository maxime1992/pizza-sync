import { IUsers } from './users.interface';

export function usersState(): IUsers {
  return {
    isIdentifying: false,
    idCurrentUser: '',

    byId: { },
    allIds: []
  };
};
