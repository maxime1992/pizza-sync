import { Module } from '@nestjs/common';

import { PizzasProvidersService } from './pizzas-providers.component';
import { PizzasModule } from '../models/pizzas/pizzas.module';
import { PizzasCategoriesModule } from '../models/pizzas-categories/pizzas-categories.module';
import { IngredientsModule } from '../models/ingredients/ingredients.module';

@Module({
  imports: [PizzasModule, PizzasCategoriesModule, IngredientsModule],
  providers: [PizzasProvidersService],
  exports: [PizzasProvidersService],
})
export class PizzasProvidersModule {}
