import { NgModule, ModuleWithProviders } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import './rxjs-operators';
import { createTranslateLoader } from '../shared/helpers/aot.helper';
import { LANGUAGES } from './opaque-tokens';
import { environment } from './../../environments/environment.prod';
import { getRootReducer } from './../shared/state/root.reducer';
import { PizzasEffects } from './../features/pizzas/pizzas.effects';
import { PizzasService } from './../features/pizzas/pizzas.service';
import { OrdersEffects } from './../shared/state/orders/orders.effects';
import { UsersEffects } from './../shared/state/users/users.effects';

@NgModule({
  imports: [
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    // TODO : Keep an eye on ngrx V3 to have lazy loaded reducers
    // https://github.com/ngrx/store/pull/269
    StoreModule.provideStore(getRootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    // pass every effect here, one per line
    EffectsModule.runAfterBootstrap(PizzasEffects),
    EffectsModule.runAfterBootstrap(OrdersEffects),
    EffectsModule.runAfterBootstrap(UsersEffects),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [
    PizzasService,
    {
      provide: LANGUAGES,
      // order matters : The first one will be used by default
      useValue: ['en', 'fr']
    },
    // use hash location strategy or not based on env
    {
      provide: LocationStrategy,
      useClass: (environment.hashLocationStrategy ? HashLocationStrategy : PathLocationStrategy)
    }
  ]
})
export class CoreModule { }
