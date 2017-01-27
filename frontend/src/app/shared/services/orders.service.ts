import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from './../../../environments/environment';
import { IOrder } from './../state/orders/orders.interface';

@Injectable()
export class OrdersService {
  constructor(private _http: Http) { }

  addOrder(order: IOrder): Observable<{order: IOrder}> {
    return this._http.post(`${environment.urlBackend}/orders`, order).map((res: Response) => res.json());
  }
}
