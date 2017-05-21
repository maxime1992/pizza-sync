import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { FeaturesRoutingModule } from 'app/features/features-routing.module';
import { PizzasModule } from 'app/features/pizzas/pizzas.module';
import { FeaturesComponent } from 'app/features/features.component';
import { OrdersModule } from 'app/features/orders/orders.module';
import { IdentificationDialogComponent } from 'app/features/identification-dialog/identification-dialog.component';
import { CountdownComponent } from 'app/features/countdown/countdown.component';

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
