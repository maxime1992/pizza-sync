import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IStore } from 'app/shared/interfaces/store.interface';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';
import { IPizzaCategoryWithPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import {
  IPizzaCommon,
  IPizzaWithIngredients,
} from 'app/shared/states/pizzas/pizzas.interface';
import { tap } from 'rxjs/operators';
import {
  getCategoriesAndPizzas,
  getPizzaSearch,
} from '../../shared/states/ui/ui.selector';

@Component({
  selector: 'app-pizza-details-dialog',
  template: `
      <div
        fxFlexFill
        [style.background-image]="'url(' + data.pizza.imgUrl + ')'"
        (click)="close()"
      ></div>
  `,
  styles: [`div { background-size: cover; }`],
})
export class PizzaDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PizzaDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pizza: IPizzaWithIngredients }
  ) {}

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzasComponent implements OnInit {
  @Input() locked: boolean;

  public pizzasCategories$: Observable<
    IPizzaCategoryWithPizzas[]
  > = this.store$.select(getCategoriesAndPizzas).pipe(tap(console.log));

  public search$: Observable<string> = this.store$.select(getPizzaSearch);

  constructor(private store$: Store<IStore>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store$.dispatch(new PizzasActions.LoadPizzas());
  }

  addOrder(pizza: IPizzaCommon, priceIndex: number) {
    this.store$.dispatch(
      new OrdersActions.AddOrder({
        pizzaId: pizza.id,
        priceIndex,
      })
    );
  }

  openPizzaDialog(pizza: IPizzaWithIngredients) {
    this.dialog.open(PizzaDetailsDialogComponent, <any>{
      width: '550px',
      height: '550px',
      panelClass: 'dialog-with-transparent-background',
      data: { pizza },
    });
  }

  trackById(index, item) {
    return item.id;
  }
}
