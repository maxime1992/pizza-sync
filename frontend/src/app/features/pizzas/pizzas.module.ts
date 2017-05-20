import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PizzasComponent } from 'app/features/pizzas/pizzas.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PizzasComponent],
  exports: [PizzasComponent]
})
export class PizzasModule { }
