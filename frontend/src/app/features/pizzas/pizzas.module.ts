import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import {
  PizzasComponent,
  PizzaDetailsDialogComponent,
} from 'app/features/pizzas/pizzas.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PizzasComponent, PizzaDetailsDialogComponent],
  exports: [PizzasComponent],
  entryComponents: [PizzaDetailsDialogComponent],
})
export class PizzasModule {}
