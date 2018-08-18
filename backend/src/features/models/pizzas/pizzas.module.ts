import { Module } from '@nestjs/common';

import { PizzasService } from './pizzas.component';

@Module({
  providers: [PizzasService],
  exports: [PizzasService],
})
export class PizzasModule {}
