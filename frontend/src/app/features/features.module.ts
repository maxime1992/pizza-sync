import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { FeaturesComponent } from './features.component';

@NgModule({
  imports: [
    SharedModule,
    FeaturesRoutingModule,
    PizzasModule
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule { }
