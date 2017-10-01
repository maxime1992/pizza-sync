import { Action } from '@ngrx/store';

import {
  IUsersTable,
  IUserCommon,
} from 'app/shared/states/users/users.interface';

export const LOAD_USERS_SUCCESS = '[Users] Load users success';
export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: IUsersTable) {}
}

export const IDENTIFICATION = '[Users] Identification';
export class Identification implements Action {
  readonly type = IDENTIFICATION;

  constructor(public payload: string) {}
}

export const IDENTIFICATION_SUCCESS = '[Users] Identification success';
export class IdentificationSuccess implements Action {
  readonly type = IDENTIFICATION_SUCCESS;

  constructor(public payload: string) {}
}

export const ADD_USER_SUCCESS = '[Users] Add user success';
export class AddUserSuccess implements Action {
  readonly type = ADD_USER_SUCCESS;

  constructor(public payload: IUserCommon) {}
}

export const SET_USER_ONLINE = '[Users] Set user online';
export class SetUserOnline implements Action {
  readonly type = SET_USER_ONLINE;

  constructor(public payload: { id: string }) {}
}

export const SET_USER_OFFLINE = '[Users] Set user offline';
export class SetUserOffline implements Action {
  readonly type = SET_USER_OFFLINE;

  constructor(public payload: { id: string }) {}
}

export type All =
  | LoadUsersSuccess
  | Identification
  | IdentificationSuccess
  | AddUserSuccess
  | SetUserOnline
  | SetUserOffline;
