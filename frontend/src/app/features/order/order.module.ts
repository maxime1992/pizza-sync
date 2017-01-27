import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { OrderComponent } from './order.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [OrderComponent],
  exports: [OrderComponent]
})
export class OrderModule { }
