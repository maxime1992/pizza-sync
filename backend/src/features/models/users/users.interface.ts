export interface IUserWithoutId {
  username: string;
  nbConnections: number;
  thumbnail: string;
  isOnline: boolean;
}

export interface IUserWithId extends IUserWithoutId {
  id: string;
}

export interface IUsersNormalized {
  entities: { [key: string]: IUserWithId };
  ids: string[];
}
