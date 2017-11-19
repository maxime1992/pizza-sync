import * as _vorpal from 'vorpal';

import { PizzasProvidersService } from '../features/pizzas-providers/pizzas-providers.component';
import { PizzasProvidersModule } from '../features/pizzas-providers/pizzas-providers.module';
import { ProvidersCommand } from './commands/providers.command';
import { ProviderCommand } from './commands/provider.command';
import { Command } from './command.class';
import { CountdownCommand } from './commands/countdown.command';
import { OrdersService } from '../features/models/orders/orders.component';
import { UsersService } from '../features/models/users/users.component';

export class CommandLineService {
  private vorpal = _vorpal();
  private commands: Command[] = [];

  constructor(
    private pizzasProvidersService: PizzasProvidersService,
    private ordersService: OrdersService,
    private usersService: UsersService
  ) {
    // register all the command by pushing them into `commands` array
    this.commands.push(
      new ProviderCommand(this.vorpal, pizzasProvidersService, usersService),
      new ProvidersCommand(this.vorpal, pizzasProvidersService),
      new CountdownCommand(this.vorpal, ordersService)
    );

    // register every commands
    this.commands.forEach(command => command.register());

    this.vorpal.delimiter('pizza-sync$').show();
  }
}
