import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { PizzasComponent } from './pizzas.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PizzasComponent],
  exports: [PizzasComponent]
})
export class PizzasModule { }
