import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { MdDialog, MdDialogRef } from '@angular/material';

import * as UiActions from 'app/shared/states/ui/ui.actions';
import { IStore } from 'app/shared/interfaces/store.interface';
import { IUi } from 'app/shared/states/ui/ui.interface';
import { IdentificationDialogComponent } from 'app/features/identification-dialog/identification-dialog.component';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<void>();

  public ui$: Observable<IUi>;
  public lockOrders = true;
  public hourAndMinuteEnd$: Observable<{ hour: number, minute: number }>;

  private dialogRef: MdDialogRef<IdentificationDialogComponent>;

  public isDialogIdentificationOpen$: Observable<boolean>;

  public isDialogIdentificationOpen: boolean;

  constructor(
    private store$: Store<IStore>,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.ui$ = this.store$.select(state => state.ui);

    this.isDialogIdentificationOpen$ = this.store$.select(state => state.ui.isDialogIdentificationOpen);

    this.isDialogIdentificationOpen$
      .takeUntil(this.componentDestroyed$)
      .do(isDialogIdentificationOpen => {
        this.isDialogIdentificationOpen = isDialogIdentificationOpen;
        this.handleOpenAndCloseDialog();
      })
      .subscribe();

    this.hourAndMinuteEnd$ = this
      .store$
      .select(state => {
        return { hour: state.orders.hourEnd, minute: state.orders.minuteEnd };
      })
      .distinctUntilChanged((p, n) => p.hour === n.hour && p.minute === n.minute);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  handleOpenAndCloseDialog() {
    if (this.isDialogIdentificationOpen) {
      this.openDialog();
    } else if (typeof this.dialogRef !== 'undefined') {
      this.dialogRef.close();
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

  openDialog() {
    this.dialogRef = this.dialog.open(IdentificationDialogComponent, {
      disableClose: true
    });

    this.dialogRef
      .afterClosed()
      .do(result => {
        this.dialogRef = null;
      })
      .subscribe();
  }
}
