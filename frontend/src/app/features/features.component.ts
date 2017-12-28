import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as csv from 'csv-file-creator';

import * as UiActions from 'app/shared/states/ui/ui.actions';
import * as IngredientsActions from 'app/shared/states/ingredients/ingredients.actions';
import { IStore } from 'app/shared/interfaces/store.interface';
import { IUi } from 'app/shared/states/ui/ui.interface';
import { IdentificationDialogComponent } from 'app/features/identification-dialog/identification-dialog.component';
import { OrderSummaryDialogComponent } from 'app/features/order-summary-dialog/order-summary-dialog.component';
import { getCurrentDateFormatted } from 'app/shared/helpers/date.helper';
import { IUserWithPizzas } from 'app/shared/states/users/users.interface';
import {
  getFullOrder,
  getFullOrderCsvFormat,
} from 'app/shared/states/users/users.selector';
import { IIngredientsArray } from 'app/shared/states/ingredients/ingredients.interface';
import {
  getIngredients,
  getNbIngredientsSelected,
  getIngredientsSelected,
} from 'app/shared/states/ingredients/ingredients.selector';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<void>();

  public ui$: Observable<IUi>;
  public lockOrders = true;
  public hourAndMinuteEnd$: Observable<{ hour: number; minute: number }>;
  public pizzaSearch$: Observable<string>;
  public nbOfPizzas$: Observable<number>;

  private dialogIdentificationRef: MatDialogRef<IdentificationDialogComponent>;
  private dialogOrderSummaryRef: MatDialogRef<OrderSummaryDialogComponent>;

  public fullOrder$: Observable<{
    users: IUserWithPizzas[];
    totalPrice: number;
  }>;
  public ingredients$: Observable<IIngredientsArray>;
  public isFilterIngredientsVisible$: Observable<boolean>;
  public nbIngredientsSelected$: Observable<number>;
  public ingredientsSelected$: Observable<IIngredientsArray>;
  public searchQuery$: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<IStore>,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ui$ = this.store$.select(state => state.ui);

    this.store$
      .select(state => state.ui.isDialogIdentificationOpen)
      .takeUntil(this.componentDestroyed$.asObservable())
      .do(isDialogIdentificationOpen =>
        this.handleOpenAndCloseDialog(
          this.dialogIdentificationRef,
          () => this.openDialogIdentification(),
          isDialogIdentificationOpen
        )
      )
      .subscribe();

    this.store$
      .select(state => state.ui.isDialogOrderSummaryOpen)
      .takeUntil(this.componentDestroyed$.asObservable())
      .do(isDialogOrderSummaryOpen =>
        this.handleOpenAndCloseDialog(
          this.dialogOrderSummaryRef,
          () => this.openDialogOrderSummary(),
          isDialogOrderSummaryOpen
        )
      )
      .subscribe();

    this.hourAndMinuteEnd$ = this.store$
      .select(state => ({
        hour: state.orders.hourEnd,
        minute: state.orders.minuteEnd,
      }))
      .distinctUntilChanged(
        (p, n) => p.hour === n.hour && p.minute === n.minute
      );

    this.searchQuery$ = this.route.queryParams.map(
      queries => queries['search'] || ''
    );

    this.searchQuery$
      .do(search =>
        this.store$.dispatch(new UiActions.UpdatePizzaSearch({ search }))
      )
      .subscribe();

    this.fullOrder$ = this.store$.let(getFullOrder);

    this.ingredients$ = this.store$.let(getIngredients);

    this.isFilterIngredientsVisible$ = this.store$.select(
      state => state.ui.isFilterIngredientVisible
    );

    this.nbIngredientsSelected$ = this.store$.let(getNbIngredientsSelected);

    this.ingredientsSelected$ = this.store$.let(getIngredientsSelected);

    this.nbOfPizzas$ = this.store$.select(state => state.orders.allIds.length);
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
      .takeUntil(this.componentDestroyed$.asObservable())
      .do(result => (this.dialogIdentificationRef = null))
      .subscribe();
  }

  openDialogOrderSummary() {
    this.dialogOrderSummaryRef = this.dialog.open(OrderSummaryDialogComponent, {
      disableClose: false,
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
