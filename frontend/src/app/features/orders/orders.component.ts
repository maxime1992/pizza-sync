import { filter } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IStore } from 'app/shared/interfaces/store.interface';
import { IUserWithPizzas } from 'app/shared/states/users/users.interface';
import {
  getFullOrder,
  getCurrentUser,
} from 'app/shared/states/users/users.selector';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';

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

  private idCurrentUser$: Observable<string>;

  constructor(private store$: Store<IStore>) {}

  ngOnInit() {
    this.idCurrentUser$ = this.store$
      .select(getCurrentUser)
      .pipe(filter(idCurrentUser => !!idCurrentUser));
  }

  removeOrder(id: string) {
    this.store$.dispatch(new OrdersActions.RemoveOrder({ id }));
  }

  trackById(index, item) {
    return item.id;
  }
}
