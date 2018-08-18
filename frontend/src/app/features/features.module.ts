import { NgModule } from '@angular/core';

import { CountdownComponent } from 'app/features/countdown/countdown.component';
import { FeaturesRoutingModule } from 'app/features/features-routing.module';
import { FeaturesComponent } from 'app/features/features.component';
import { IdentificationDialogComponent } from 'app/features/identification-dialog/identification-dialog.component';
import { OrderSummaryDialogComponent } from 'app/features/order-summary-dialog/order-summary-dialog.component';
import { OrdersModule } from 'app/features/orders/orders.module';
import { PizzasModule } from 'app/features/pizzas/pizzas.module';
import { SharedModule } from 'app/shared/shared.module';
import { FilterIngredientsComponent } from './filter-ingredients/filter-ingredients.component';
import { FooterComponent } from './footer/footer.component';
import { PizzasSearchComponent } from './pizzas-search/pizzas-search.component';

@NgModule({
  imports: [SharedModule, FeaturesRoutingModule, PizzasModule, OrdersModule],
  declarations: [
    FeaturesComponent,
    IdentificationDialogComponent,
    CountdownComponent,
    OrderSummaryDialogComponent,
    PizzasSearchComponent,
    FilterIngredientsComponent,
    FooterComponent,
  ],
  entryComponents: [IdentificationDialogComponent, OrderSummaryDialogComponent],
})
export class FeaturesModule {}
