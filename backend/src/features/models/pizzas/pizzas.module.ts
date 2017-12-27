import { Module } from '@nestjs/common';

import { PizzasService } from './pizzas.component';

@Module({
  components: [PizzasService],
  exports: [PizzasService],
})
export class PizzasModule {}
