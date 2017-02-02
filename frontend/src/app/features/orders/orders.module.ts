import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { OrdersComponent } from './orders.component';
import { UserOrderComponent } from './user-order/user-order.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [OrdersComponent, UserOrderComponent],
  exports: [OrdersComponent]
})
export class OrdersModule { }
