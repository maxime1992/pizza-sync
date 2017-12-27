import { style } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Input, TemplateRef, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IPizzaCategoryWithPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.interface';
import { IStore } from 'app/shared/interfaces/store.interface';
import { getCategoriesAndPizzas } from 'app/shared/states/pizzas-categories/pizzas-categories.selector';
import {
  IPizzaCommon,
  IPizzaWithIngredients,
} from 'app/shared/states/pizzas/pizzas.interface';
import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
})
export class PizzasComponent implements OnInit {
  @Input() locked: boolean;

  public pizzasCategories$: Observable<IPizzaCategoryWithPizzas[]>;
  public pizzasCategories: IPizzaCategoryWithPizzas[];
  public search$: Observable<string>;

  constructor(private store$: Store<IStore>, public dialog: MatDialog) {}

  ngOnInit() {
    this.store$.dispatch(new PizzasActions.LoadPizzas());

    this.search$ = this.store$.select(state => state.ui.pizzaSearch);

    this.pizzasCategories$ = this.store$.let(getCategoriesAndPizzas);
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
    // tslint:disable-next-line:no-use-before-declare
    const dialogRef = this.dialog.open(PizzaDetailsDialogComponent, <any>{
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
