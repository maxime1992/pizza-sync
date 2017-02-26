import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { MdDialog, MdDialogRef } from '@angular/material';

import { LANGUAGES } from '../core/opaque-tokens';
import { IStore } from '../shared/interfaces/store.interface';
import { IUi } from '../shared/state/ui/ui.interface';
import { Ui } from './../shared/state/ui/ui.reducer';
import { IdentificationDialogComponent } from './identification-dialog/identification-dialog.component';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  public ui$: Observable<IUi>;
  public lockOrders = true;
  public hourAndMinuteEnd$: Observable<{ hour: number, minute: number }>;

  public language = '';
  private _languageSub: Subscription;

  private dialogRef: MdDialogRef<IdentificationDialogComponent>;

  public isDialogIdentificationOpen$: Observable<boolean>;
  public isDialogIdentificationOpenSub: Subscription;

  public isDialogIdentificationOpen: boolean;

  constructor(
    @Inject(LANGUAGES) public languages: any,
    private _store$: Store<IStore>,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.ui$ = this._store$.select(state => state.ui);

    this.isDialogIdentificationOpen$ = this._store$.select(state => state.ui.isDialogIdentificationOpen);

    this.isDialogIdentificationOpenSub = this
      .isDialogIdentificationOpen$
      .subscribe(isDialogIdentificationOpen => {
        this.isDialogIdentificationOpen = isDialogIdentificationOpen;
        this.handleOpenAndCloseDialog();
      });

    this.hourAndMinuteEnd$ = this
      ._store$
      .select(state => {
        return { hour: state.orders.hourEnd, minute: state.orders.minuteEnd };
      })
      .distinctUntilChanged((p, n) => p.hour === n.hour && p.minute === n.minute);
  }

  ngOnDestroy() {
    this._languageSub.unsubscribe();
  }

  handleOpenAndCloseDialog() {
    if (this.isDialogIdentificationOpen) {
      this.openDialog();
    } else if (typeof this.dialogRef !== 'undefined') {
      this.dialogRef.close();
    }
  }

  openSidenav() {
    this._store$.dispatch({ type: Ui.OPEN_SIDENAV });
  }

  closeSidenav() {
    this._store$.dispatch({ type: Ui.CLOSE_SIDENAV });
  }

  toggleSidenav() {
    this._store$.dispatch({ type: Ui.TOGGLE_SIDENAV });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(IdentificationDialogComponent, {
      disableClose: true
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }
}
