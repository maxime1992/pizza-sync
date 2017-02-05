import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from './../../../environments/environment';
import { IUserCommon } from './../state/users/users.interface';

@Injectable()
export class UsersService {
  constructor(private _http: Http) { }

  identification(user: IUserCommon) {
    return this._http.post(`${environment.urlBackend}/users`, user).map((res: Response) => res.json());
  }

  checkUserAlreadyConnected(username: string) {
    return this._http.get(`${environment.urlBackend}/users/${username}`).map((res: Response) => res.json());
  }
}
