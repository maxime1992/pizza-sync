import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IdentificationDialogComponent } from 'app/features/identification-dialog/identification-dialog.component';
import { OrderSummaryDialogComponent } from 'app/features/order-summary-dialog/order-summary-dialog.component';
import { getCurrentDateFormatted } from 'app/shared/helpers/date.helper';
import { IStore } from 'app/shared/interfaces/store.interface';
import * as IngredientsActions from 'app/shared/states/ingredients/ingredients.actions';
import { IIngredientCommon } from 'app/shared/states/ingredients/ingredients.interface';
import {
  getNbIngredientsSelected,
  getSelectedIngredients,
} from 'app/shared/states/ingredients/ingredients.selector';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import { IUi } from 'app/shared/states/ui/ui.interface';
import { IUserWithPizzas } from 'app/shared/states/users/users.interface';
import {
  getFullOrder,
  getFullOrderCsvFormat,
} from 'app/shared/states/users/users.selector';
import * as csv from 'csv-file-creator';
import { Observable, Subject } from 'rxjs';
import {
  first,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  getTimeEnd,
  selectOrdersTotal,
} from '../shared/states/orders/orders.selector';
import {
  getIngredients,
  getIsDialogIdentificationOpen,
  getIsDialogOrderSummaryOpen,
  getIsFilterIngredientVisible,
  selectUiState,
} from '../shared/states/ui/ui.selector';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<void>();

  public ui$: Observable<IUi>;
  public lockOrders = true;
  public hourAndMinuteEnd$: Observable<{
    hour: number;
    minute: number;
  }> = this.store$.select(getTimeEnd);
  public pizzaSearch$: Observable<string>;
  public nbOfPizzas$: Observable<number> = this.store$.select(
    selectOrdersTotal
  );

  private dialogIdentificationRef: MatDialogRef<IdentificationDialogComponent>;
  private dialogOrderSummaryRef: MatDialogRef<OrderSummaryDialogComponent>;

  public fullOrder$: Observable<{
    users: IUserWithPizzas[];
    totalPrice: number;
  }> = this.store$.select(getFullOrder);

  public ingredients$: Observable<IIngredientCommon[]> = this.store$.select(
    getIngredients
  );
  public isFilterIngredientsVisible$: Observable<boolean> = this.store$.select(
    getIsFilterIngredientVisible
  );
  public nbIngredientsSelected$: Observable<number> = this.store$.select(
    getNbIngredientsSelected
  );
  public ingredientsSelected$: Observable<
    IIngredientCommon[]
  > = this.store$.select(getSelectedIngredients);

  public searchQuery$: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<IStore>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ui$ = this.store$.select(selectUiState);

    this.store$
      .select(getIsDialogIdentificationOpen)
      .pipe(
        tap(isDialogIdentificationOpen =>
          this.handleOpenAndCloseDialog(
            this.dialogIdentificationRef,
            () => this.openDialogIdentification(),
            isDialogIdentificationOpen
          )
        ),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();

    this.store$
      .select(getIsDialogOrderSummaryOpen)
      .pipe(
        tap(isDialogOrderSummaryOpen =>
          this.handleOpenAndCloseDialog(
            this.dialogOrderSummaryRef,
            () => this.openDialogOrderSummary(),
            isDialogOrderSummaryOpen
          )
        ),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();

    this.searchQuery$ = this.route.queryParams.pipe(
      map(queries => queries['search'] || '')
    );

    this.searchQuery$
      .pipe(
        tap(search =>
          this.store$.dispatch(new UiActions.UpdatePizzaSearch({ search }))
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  handleOpenAndCloseDialog<T>(
    matDialogRef: MatDialogRef<T>,
    fnOpen: () => void,
    isOpened: boolean
  ) {
    if (isOpened) {
      // open the corresponding dialog and ensure
      // it's not done in another change detection step
      setTimeout(() => fnOpen());
    } else if (typeof matDialogRef !== 'undefined') {
      matDialogRef.close();
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
    this.dialogIdentificationRef = this.dialog.open(
      IdentificationDialogComponent,
      {
        disableClose: true,
        width: '300px',
      }
    );

    this.dialogIdentificationRef
      .afterClosed()
      .pipe(
        tap(result => (this.dialogIdentificationRef = null)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe();
  }

  openDialogOrderSummary() {
    this.dialogOrderSummaryRef = this.dialog.open(OrderSummaryDialogComponent, {
      disableClose: false,
    });

    this.dialogOrderSummaryRef
      .afterClosed()
      .pipe(
        first(),
        tap(() => {
          this.store$.dispatch(new UiActions.CloseDialogOrderSummary());
          this.dialogOrderSummaryRef = null;
        })
      )
      .subscribe();
  }

  downloadCsv() {
    this.store$
      .select(getFullOrderCsvFormat)
      .pipe(
        first(),
        tap(fullOrderCsvFormat => {
          const currentDate = getCurrentDateFormatted();
          csv(`pizza-sync-${currentDate}.csv`, fullOrderCsvFormat);
        })
      )
      .subscribe();
  }

  search(search: string) {
    search = search.trim();

    if (!search) {
      this.router.navigate([''], { queryParams: {} });
    } else {
      this.router.navigate([''], { queryParams: { search } });
    }
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
