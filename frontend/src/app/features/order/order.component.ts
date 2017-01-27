import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IStore } from './../../shared/interfaces/store.interface';
import { IUsers, IUserWithPizzas } from './../../shared/state/users/users.interface';
import { getFullOrder } from './../../shared/state/users/users.selector';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public fullOrder$: Observable<{users: IUserWithPizzas[], totalPrice: number}>;

  constructor(private _store$: Store<IStore>) { }

  ngOnInit() {
    this.fullOrder$ = this._store$.let(getFullOrder());
  }
}
