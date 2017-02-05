import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IStore } from './../../shared/interfaces/store.interface';
import { IUserWithPizzas } from './../../shared/state/users/users.interface';
import { getFullOrder } from './../../shared/state/users/users.selector';
import { Orders } from './../../shared/state/orders/orders.reducer';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public fullOrder$: Observable<{ users: IUserWithPizzas[], totalPrice: number }>;
  private _idCurrentUser$: Observable<string>;
  public idCurrentUser = '';

  constructor(private _store$: Store<IStore>) { }

  ngOnInit() {
    this.fullOrder$ = this._store$.let(getFullOrder());
    this._idCurrentUser$ = this
      ._store$
      .select(state => state.users.idCurrentUser)
      .filter(idCurrentUser => idCurrentUser !== '');

    this
      ._idCurrentUser$
      .first()
      .subscribe(idCurrentUser => this.idCurrentUser = idCurrentUser);
  }

  removeOrder(orderId: string) {
    this._store$.dispatch({ type: Orders.REMOVE_ORDER, payload: { id: orderId } });
  }
}
