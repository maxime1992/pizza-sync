import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { Http } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Ng2Webstorage } from 'ng2-webstorage';
// import hammerjs only if needed :
// From https://material.angular.io/guide/getting-started#additional-setup-for-gestures
// Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS for gestures
// In order to get the full feature-set of these components, HammerJS must be loaded into the application
// import 'hammerjs';

// import RxJs needed operators only once
import './rxjs-operators';
import { createTranslateLoader } from 'app/shared/helpers/aot.helper';
import { LANGUAGES } from 'app/core/injection-tokens';
import { environment } from 'environments/environment';
import { getRootReducer } from 'app/shared/states/root.reducer';
import { PizzasEffects } from 'app/features/pizzas/pizzas.effects';
import { PizzasService } from 'app/features/pizzas/pizzas.service';
import { OrdersEffects } from 'app/shared/states/orders/orders.effects';
import { UsersEffects } from 'app/shared/states/users/users.effects';
import { OrdersService } from 'app/shared/services/orders.service';
import { UsersService } from 'app/shared/services/users.service';
import { WebsocketService } from 'app/shared/services/websocket.service';
import { CountdownService } from 'app/shared/services/countdown.service';

/**
 * this module will be imported only once, in AppModule and shouldn't be imported from anywhere else
 * you can define here the modules and providers that you only want to import once
 */
@NgModule({
  imports: [
    // START : Do not add your libs here
    BrowserAnimationsModule,
    // TODO : Keep an eye on ngrx V3 to have lazy loaded reducers
    // https://github.com/ngrx/store/pull/269
    StoreModule.provideStore(getRootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    // END : Do not add your libs here

    Ng2Webstorage,

    // pass every effect here, one per line
    EffectsModule.runAfterBootstrap(PizzasEffects),
    EffectsModule.runAfterBootstrap(OrdersEffects),
    EffectsModule.runAfterBootstrap(UsersEffects)
  ],
  providers: [
    PizzasService,
    OrdersService,
    UsersService,
    WebsocketService,
    CountdownService,
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
