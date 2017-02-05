import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IPizzasTable } from './../../shared/state/pizzas/pizzas.interface';
import { IPizzasCategoriesTable } from './../../shared/state/pizzas-categories/pizzas-categories.interface';
import { IUsersTable } from './../../shared/state/users/users.interface';
import { IOrdersTable } from './../../shared/state/orders/orders.interface';
import { environment } from './../../../environments/environment';

@Injectable()
export class PizzasService {
  constructor(private _http: Http) { }

  getPizzas(): Observable<{pizzas: IPizzasTable, pizzasCategories: IPizzasCategoriesTable, users: IUsersTable, orders: IOrdersTable}> {
    return this._http.get(`${environment.urlBackend}/pizzas`).map((res: Response) => res.json());
  }
}
