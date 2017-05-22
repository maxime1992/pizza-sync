import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { MdDialog, MdDialogRef } from '@angular/material';

import * as UiActions from 'app/shared/states/ui/ui.actions';
import { IStore } from 'app/shared/interfaces/store.interface';
import { IUi } from 'app/shared/states/ui/ui.interface';
import { IdentificationDialogComponent } from 'app/features/identification-dialog/identification-dialog.component';
import { OrderSummaryDialogComponent } from 'app/features/order-summary-dialog/order-summary-dialog.component';

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

  private dialogIdentificationRef: MdDialogRef<IdentificationDialogComponent>;
  private dialogOrderSummaryRef: MdDialogRef<OrderSummaryDialogComponent>;

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
}
