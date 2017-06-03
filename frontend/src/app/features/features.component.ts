import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { MdDialog, MdDialogRef } from '@angular/material';
import csv from 'csv-file-creator';

import * as UiActions from 'app/shared/states/ui/ui.actions';
import * as IngredientsActions from 'app/shared/states/ingredients/ingredients.actions';
import { IStore } from 'app/shared/interfaces/store.interface';
import { IUi } from 'app/shared/states/ui/ui.interface';
import { IdentificationDialogComponent } from 'app/features/identification-dialog/identification-dialog.component';
import { OrderSummaryDialogComponent } from 'app/features/order-summary-dialog/order-summary-dialog.component';
import { getCurrentDateFormatted } from 'app/shared/helpers/date.helper';
import { IUserWithPizzas } from 'app/shared/states/users/users.interface';
import { getFullOrder, getFullOrderCsvFormat } from 'app/shared/states/users/users.selector';
import { IIngredientsArray } from 'app/shared/states/ingredients/ingredients.interface';
import { getIngredients } from 'app/shared/states/ingredients/ingredients.selector';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('1000ms', style({ opacity: 1 }))
        ])
      ]
    )
  ]
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<void>();

  public ui$: Observable<IUi>;
  public lockOrders = true;
  public hourAndMinuteEnd$: Observable<{ hour: number, minute: number }>;
  public pizzaSearch$: Observable<string>;

  private dialogIdentificationRef: MdDialogRef<IdentificationDialogComponent>;
  private dialogOrderSummaryRef: MdDialogRef<OrderSummaryDialogComponent>;

  public fullOrder$: Observable<{ users: IUserWithPizzas[], totalPrice: number }>;
  public ingredients$: Observable<IIngredientsArray>;
  public isFilterIngredientsVisible$: Observable<boolean>;

  constructor(
    private store$: Store<IStore>,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.ui$ = this.store$.select(state => state.ui);

    this.store$
      .select(state => state.ui.isDialogIdentificationOpen)
      .takeUntil(this.componentDestroyed$)
      .do(isDialogIdentificationOpen => this.handleOpenAndCloseDialog(
        this.dialogIdentificationRef,
        () => this.openDialogIdentification(),
        isDialogIdentificationOpen
      ))
      .subscribe();

    this.store$
      .select(state => state.ui.isDialogOrderSummaryOpen)
      .takeUntil(this.componentDestroyed$)
      .do(isDialogOrderSummaryOpen => this.handleOpenAndCloseDialog(
        this.dialogOrderSummaryRef,
        () => this.openDialogOrderSummary(),
        isDialogOrderSummaryOpen
      ))
      .subscribe();

    this.hourAndMinuteEnd$ = this
      .store$
      .select(state => ({ hour: state.orders.hourEnd, minute: state.orders.minuteEnd }))
      .distinctUntilChanged((p, n) => p.hour === n.hour && p.minute === n.minute);

    this.fullOrder$ = this.store$.let(getFullOrder);

    this.ingredients$ = this.store$.let(getIngredients);

    this.isFilterIngredientsVisible$ = this.store$.select(state => state.ui.isFilterIngredientVisible);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  handleOpenAndCloseDialog<T>(mdDialogRef: MdDialogRef<T>, fnOpen: () => void, isOpened: boolean) {
    if (isOpened) {
      // open the corresponding dialog
      fnOpen();
    } else if (typeof mdDialogRef !== 'undefined') {
      mdDialogRef.close();
    }
  }

  openSidenav() {
    this.store$.dispatch(new UiActions.OpenSidenav());
  }

  closeSidenav() {
    this.store$.dispatch(new UiActions.CloseSidenav());
  }

  toggleSidenav() {
    this.store$.dispatch(new UiActions.ToggleSidenav());
  }

  openOrderSummaryDialog() {
    this.store$.dispatch(new UiActions.OpenDialogOrderSummary());
  }

  openDialogIdentification() {
    this.dialogIdentificationRef = this.dialog.open(IdentificationDialogComponent, {
      disableClose: true
    });

    this.dialogIdentificationRef
      .afterClosed()
      .takeUntil(this.componentDestroyed$)
      .do(result => this.dialogIdentificationRef = null)
      .subscribe();
  }

  openDialogOrderSummary() {
    this.dialogOrderSummaryRef = this.dialog.open(OrderSummaryDialogComponent, {
      disableClose: false
    });

    this.dialogOrderSummaryRef
      .afterClosed()
      .first()
      .do(result => {
        this.store$.dispatch(new UiActions.CloseDialogOrderSummary());
        this.dialogOrderSummaryRef = null;
      })
      .subscribe();
  }

  downloadCsv() {
    this.fullOrder$
      .first()
      .map(getFullOrderCsvFormat)
      .do(fullOrderCsvFormat => {
        const currentDate = getCurrentDateFormatted();
        csv(`pizza-sync-${currentDate}.csv`, fullOrderCsvFormat);
      })
      .subscribe();
  }

  search(search: string) {
    this.store$.dispatch(new UiActions.UpdatePizzaSearch({ search }));
  }

  toggleFilterIngredients() {
    this.store$.dispatch(new UiActions.ToggleVisibilityFilterIngredient());
  }

  selectIngredient(id: string) {
    this.store$.dispatch(new IngredientsActions.SelectIngredient({ id }));
  }

  unselectIngredient(id: string) {
    this.store$.dispatch(new IngredientsActions.UnselectIngredient({ id }));
  }
}
