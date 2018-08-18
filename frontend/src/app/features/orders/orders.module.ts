import { NgModule } from '@angular/core';

import { OrdersComponent } from 'app/features/orders/orders.component';
import { UserOrderComponent } from 'app/features/orders/user-order/user-order.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [OrdersComponent, UserOrderComponent],
  exports: [OrdersComponent],
})
export class OrdersModule {}
