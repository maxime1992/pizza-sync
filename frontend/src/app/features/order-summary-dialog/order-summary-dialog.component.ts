import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IStore } from 'app/shared/interfaces/store.interface';
import {
  getOrderSummary,
  selectOrdersTotal,
} from 'app/shared/states/orders/orders.selector';
import {
  IOrdersSummary,
  IPizzaOrderSummary,
} from 'app/shared/states/orders/orders.interface';

@Component({
  selector: 'app-order-summary-dialog',
  templateUrl: './order-summary-dialog.component.html',
  styleUrls: ['./order-summary-dialog.component.scss'],
})
export class OrderSummaryDialogComponent implements OnInit {
  public orderSummary$: Observable<IOrdersSummary>;
  public nbOfPizzas$: Observable<number>;

  constructor(private store$: Store<IStore>) {}

  ngOnInit() {
    this.orderSummary$ = this.store$.select(getOrderSummary);
    this.nbOfPizzas$ = this.store$.select(selectOrdersTotal);
  }

  howManyPerSize(pizzaOrderSummary: IPizzaOrderSummary) {
    const nbS = pizzaOrderSummary.howManyPerSize['S'].howMany;
    const nbM = pizzaOrderSummary.howManyPerSize['M'].howMany;
    const nbL = pizzaOrderSummary.howManyPerSize['L'].howMany;
    const nbXl = pizzaOrderSummary.howManyPerSize['XL'].howMany;

    const howManyPerSizeStr = [
      nbS > 0 ? `Small x${nbS}` : '',
      nbM > 0 ? `Medium x${nbM}` : '',
      nbL > 0 ? `Large x${nbL}` : '',
      nbXl > 0 ? `Extra large x${nbXl}` : '',
    ]
      .filter(s => s !== '')
      .join(', ');

    return howManyPerSizeStr;
  }
}
