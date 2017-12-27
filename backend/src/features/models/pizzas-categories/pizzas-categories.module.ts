import { Module } from '@nestjs/common';

import { PizzasCategoriesService } from './pizzas-categories.component';

@Module({
  components: [PizzasCategoriesService],
  exports: [PizzasCategoriesService],
})
export class PizzasCategoriesModule {}
