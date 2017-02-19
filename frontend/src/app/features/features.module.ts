import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { FeaturesComponent } from './features.component';
import { OrdersModule } from './orders/orders.module';
import { IdentificationDialogComponent } from './identification-dialog/identification-dialog.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
  imports: [
    SharedModule,
    FeaturesRoutingModule,
    PizzasModule,
    OrdersModule
  ],
  declarations: [
    FeaturesComponent,
    IdentificationDialogComponent,
    CountdownComponent
  ],
  entryComponents: [IdentificationDialogComponent]
})
export class FeaturesModule { }
