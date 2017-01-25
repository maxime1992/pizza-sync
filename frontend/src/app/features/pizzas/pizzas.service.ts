import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class PizzasService {
  constructor(private _http: Http) { }

  getPizzas() {
    return this._http.get('http://localhost:3000/pizzas').map((res: Response) => res.json());
  }
}
