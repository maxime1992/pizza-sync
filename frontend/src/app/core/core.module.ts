import {
  HashLocationStrategy,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Ng2Webstorage } from 'ng2-webstorage';
// import hammerjs only if needed :
// From https://material.angular.io/guide/getting-started#additional-setup-for-gestures
// Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS for gestures
// In order to get the full feature-set of these components, HammerJS must be loaded into the application
// import 'hammerjs';

import { LANGUAGES } from 'app/core/injection-tokens';
import { PizzasEffects } from 'app/features/pizzas/pizzas.effects';
import { PizzasService } from 'app/features/pizzas/pizzas.service';
import { createTranslateLoader } from 'app/shared/helpers/aot.helper';
import { CountdownService } from 'app/shared/services/countdown.service';
import { OrdersService } from 'app/shared/services/orders.service';
import { UsersService } from 'app/shared/services/users.service';
import { WebsocketService } from 'app/shared/services/websocket.service';
import { OrdersEffects } from 'app/shared/states/orders/orders.effects';
import { metaReducers, reducers } from 'app/shared/states/root.reducer';
import { UsersEffects } from 'app/shared/states/users/users.effects';
import { environment } from 'environments/environment';

/**
 * this module will be imported only once, in AppModule and shouldn't be imported from anywhere else
 * you can define here the modules and providers that you only want to import once
 */
@NgModule({
  imports: [
    // START : Do not add your libs here
    BrowserAnimationsModule,
    // TODO : lazy loaded reducers?
    StoreModule.forRoot(reducers, { metaReducers }),
    // TODO it's not clear if the module is enabled when the extension is not present...
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // END : Do not add your libs here

    Ng2Webstorage,

    // TODO batched actions are not taken into accounts by effects
    EffectsModule.forRoot([PizzasEffects, OrdersEffects, UsersEffects]),
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
      useValue: ['en', 'fr'],
    },
    // use hash location strategy or not based on env
    {
      provide: LocationStrategy,
      useClass: environment.hashLocationStrategy
        ? HashLocationStrategy
        : PathLocationStrategy,
    },
  ],
})
export class CoreModule {}
