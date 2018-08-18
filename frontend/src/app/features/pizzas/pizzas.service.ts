import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IIngredientsTable } from 'app/shared/states/ingredients/ingredients.interface';
import { IOrdersTable } from 'app/shared/states/orders/orders.interface';
import { IPizzasCategoriesTable } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IPizzasTable } from 'app/shared/states/pizzas/pizzas.interface';
import { IUsersTable } from 'app/shared/states/users/users.interface';
import { environment } from 'environments/environment';

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
