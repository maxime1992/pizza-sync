import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { MatIconRegistry } from '@angular/material';

import { LANGUAGES } from 'app/core/injection-tokens';
import { IStore } from 'app/shared/interfaces/store.interface';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import { WebsocketService } from 'app/shared/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    @Inject(LANGUAGES) public languages,
    private store$: Store<IStore>,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private websocketService: WebsocketService
  ) {}

  ngOnInit() {
    // default and fallback language
    // if a translation isn't found in a language,
    // it'll try to get it on the default language
    // by default here, we take the first of the array
    this.translate.setDefaultLang(this.languages[0]);
    this.store$.dispatch(
      new UiActions.SetLanguage({ language: this.languages[0] })
    );

    // when the language changes in store,
    // change it in translate provider
    this.store$
      .select(state => state.ui.language)
      .takeUntil(this.onDestroy$)
      .filter(language => !!language)
      .do(language => this.translate.use(language))
      .subscribe();

    const safeLogo = this.sanitizer.bypassSecurityTrustResourceUrl(
      '/assets/img/github-logo.svg'
    );
    this.matIconRegistry.addSvgIcon('github', safeLogo);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
