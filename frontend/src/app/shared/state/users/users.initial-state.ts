import { IUsers } from './users.interface';

export function usersState(): IUsers {
  return {
    isIdentifying: false,

    byId: { },
    allIds: []
  };
};
