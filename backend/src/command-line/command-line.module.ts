import { Module, Inject } from '@nestjs/common';

import { CommandLineService } from './command-line.component';
import { PizzasProvidersModule } from '../features/pizzas-providers/pizzas-providers.module';
import { PizzasProvidersService } from '../features/pizzas-providers/pizzas-providers.component';
import { OrdersService } from '../features/models/orders/orders.component';
import { OrdersModule } from '../features/models/orders/orders.module';
import { UsersModule } from '../features/models/users/users.module';
import { UsersService } from '../features/models/users/users.component';

// before creating the `CommandLineService` we need to wait
// for the default pizza provider to be set
const CommandLineServiceFactory = {
  provide: 'CommandLineService',
  useFactory: async (
    pizzasProvidersService: PizzasProvidersService,
    ordersService: OrdersService,
    usersService: UsersService
  ) => {
    await pizzasProvidersService.setDefaultProvider();
    return new CommandLineService(
      pizzasProvidersService,
      ordersService,
      usersService
    );
  },
  inject: [PizzasProvidersService, OrdersService, UsersService],
};

@Module({
  modules: [PizzasProvidersModule, OrdersModule, UsersModule],
  components: [CommandLineServiceFactory],
})
export class CommandLineModule {
  constructor(@Inject('CommandLineService') commandLineService) {}
}
