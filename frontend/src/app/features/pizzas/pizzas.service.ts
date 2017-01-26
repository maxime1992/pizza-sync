import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IPizzas } from './../../shared/state/pizzas/pizzas.interface';
import { IPizzasCategories } from './../../shared/state/pizzas-categories/pizzas-categories.interface';

@Injectable()
export class PizzasService {
  constructor(private _http: Http) { }

  getPizzas(): Observable<{pizzas: IPizzas, pizzasCategories: IPizzasCategories}> {
    return this._http.get('http://localhost:3000/pizzas').map((res: Response) => res.json());
  }
}
