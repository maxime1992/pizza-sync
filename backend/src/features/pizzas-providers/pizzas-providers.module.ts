import { Module } from '@nestjs/common';

import { PizzasProvidersService } from './pizzas-providers.component';
import { OrmeauProvider } from './implementations/ormeau.class';

@Module({
  components: [PizzasProvidersService],
  exports: [PizzasProvidersService],
})
export class PizzasProvidersModule {}
