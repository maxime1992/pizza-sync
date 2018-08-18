import { Module } from '@nestjs/common';

import { OrdersService } from './orders.component';

@Module({
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
