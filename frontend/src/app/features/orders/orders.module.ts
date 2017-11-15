import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { OrdersComponent } from 'app/features/orders/orders.component';
import { UserOrderComponent } from 'app/features/orders/user-order/user-order.component';

@NgModule({
  imports: [SharedModule],
  declarations: [OrdersComponent, UserOrderComponent],
  exports: [OrdersComponent],
})
export class OrdersModule {}
