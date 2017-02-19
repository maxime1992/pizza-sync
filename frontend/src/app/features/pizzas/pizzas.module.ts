import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { PizzasComponent } from './pizzas.component';
import { PizzaComponent } from './pizza/pizza.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [PizzasComponent, PizzaComponent],
  exports: [PizzasComponent]
})
export class PizzasModule { }
