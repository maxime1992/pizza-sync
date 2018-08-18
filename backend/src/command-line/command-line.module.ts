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
    try {
      await pizzasProvidersService.setDefaultProvider();
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.log('An error occured while setting the default provider:');
      // tslint:disable-next-line:no-console
      console.log(err.message);
      // tslint:disable-next-line:no-console
      console.log('Skipping that step, please set one manually');
    }

    return new CommandLineService(
      pizzasProvidersService,
      ordersService,
      usersService
    );
  },
  inject: [PizzasProvidersService, OrdersService, UsersService],
};

@Module({
  imports: [PizzasProvidersModule, OrdersModule, UsersModule],
  providers: [CommandLineServiceFactory],
})
export class CommandLineModule {
  constructor(@Inject('CommandLineService') commandLineService) {}
}
