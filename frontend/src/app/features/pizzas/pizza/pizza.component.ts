import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { IPizzaCommon } from './../../../shared/state/pizzas/pizzas.interface';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaComponent implements OnInit {
  @Input() pizza: IPizzaCommon;
  @Input() locked: boolean;
  @Output() onAddOrder: EventEmitter<{pizza: IPizzaCommon, priceIndex: number}> = new EventEmitter<{pizza, priceIndex}>();

  constructor() { }

  ngOnInit() {
  }

  addOrder(pizza: IPizzaCommon, priceIndex: number) {
    this.onAddOrder.next({pizza, priceIndex});
  }
}
