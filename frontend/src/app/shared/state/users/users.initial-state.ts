import { IUsers } from './users.interface';

export function usersState(): IUsers {
  return {
    byId: { },
    allIds: []
  };
};
