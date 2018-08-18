import { NgModule } from '@angular/core';

import {
  PizzaDetailsDialogComponent,
  PizzasComponent,
} from 'app/features/pizzas/pizzas.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [PizzasComponent, PizzaDetailsDialogComponent],
  exports: [PizzasComponent],
  entryComponents: [PizzaDetailsDialogComponent],
})
export class PizzasModule {}
