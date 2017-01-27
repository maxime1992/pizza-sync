import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IPizzas } from './../../shared/state/pizzas/pizzas.interface';
import { IPizzasCategories } from './../../shared/state/pizzas-categories/pizzas-categories.interface';
import { IUsers } from './../../shared/state/users/users.interface';
import { IOrders } from './../../shared/state/orders/orders.interface';
import { environment } from './../../../environments/environment';

@Injectable()
export class PizzasService {
  constructor(private _http: Http) { }

  getPizzas(): Observable<{pizzas: IPizzas, pizzasCategories: IPizzasCategories, users: IUsers, orders: IOrders}> {
    return this._http.get(`${environment.urlBackend}/pizzas`).map((res: Response) => res.json());
  }
}
