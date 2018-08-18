import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IStore } from 'app/shared/interfaces/store.interface';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';
import { IUserWithPizzas } from 'app/shared/states/users/users.interface';
import {
  getCurrentUser,
  getFullOrder,
} from 'app/shared/states/users/users.selector';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @Input() locked: boolean;
  public fullOrder$: Observable<{
    users: IUserWithPizzas[];
    totalPrice: number;
  }> = this.store$.select(getFullOrder);

  public idCurrentUser$: Observable<string> = this.store$
    .select(getCurrentUser)
    .pipe(filter(idCurrentUser => !!idCurrentUser));

  constructor(private store$: Store<IStore>) {}

  ngOnInit() {}

  removeOrder(id: string) {
    this.store$.dispatch(new OrdersActions.RemoveOrder({ id }));
  }

  trackById(index, item) {
    return item.id;
  }
}
