import { Module } from '@nestjs/common';

import { PizzasCategoriesService } from './pizzas-categories.component';

@Module({
  providers: [PizzasCategoriesService],
  exports: [PizzasCategoriesService],
})
export class PizzasCategoriesModule {}
