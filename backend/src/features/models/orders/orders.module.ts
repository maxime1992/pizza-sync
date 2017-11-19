import { Module } from '@nestjs/common';

import { OrdersService } from './orders.component';

@Module({
  components: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
