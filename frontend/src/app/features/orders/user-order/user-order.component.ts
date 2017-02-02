import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import { IUserWithPizzas } from './../../../shared/state/users/users.interface';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserOrderComponent {
  @Input() user: IUserWithPizzas;
  @Input() idCurrentUser: string;
  @Output() onRemoveOrder = new EventEmitter();

  constructor() { }

  getThumbnail(user: IUserWithPizzas) {
    return user.thumbnail || 'assets/img/icon-person.png';
  }
}
