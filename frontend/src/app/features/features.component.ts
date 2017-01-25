import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { LANGUAGES } from '../core/opaque-tokens';
import { IStore } from '../shared/interfaces/store.interface';
import { IUi } from '../shared/state/ui/ui.interface';
import { Ui } from './../shared/state/ui/ui.reducer';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  public ui$: Observable<IUi>;

  public language = '';
  private _languageSub: Subscription;

  constructor(
    @Inject(LANGUAGES) public languages,
    private _store$: Store<IStore>
  ) { }

  ngOnInit() {
    this.ui$ = this._store$.select(state => state.ui);
  }

  ngOnDestroy() {
    this._languageSub.unsubscribe();
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
}
