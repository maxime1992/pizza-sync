import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';
import { IPizzasCategoriesTable } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IUsersTable } from 'app/shared/states/users/users.interface';
import { IOrdersTable } from 'app/shared/states/orders/orders.interface';
import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}

  // TODO : As we're now calling initial-state
  // we should move this call into another service
  getPizzas(): Observable<{
    pizzeria: {
      name: string;
      phone: string;
      url: string;
    };
    pizzas: IPizzasTable;
    pizzasCategories: IPizzasCategoriesTable;
    users: IUsersTable;
    orders: IOrdersTable;
    ingredients: IIngredientsTable;
  }> {
    return this.http.get<any>(`${environment.urlBackend}/initial-state`);
  }
}
