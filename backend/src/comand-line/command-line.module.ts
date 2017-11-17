import { Module, Inject } from '@nestjs/common';

import { CommandLineService } from './command-line.component';
import { PizzasProvidersModule } from '../pizzas-providers/pizzas-providers.module';
import { PizzasProvidersService } from '../pizzas-providers/pizzas-providers.component';

// before creating the `CommandLineService` we need to wait
// for the default pizza provider to be set
const CommandLineServiceFactory = {
  provide: 'CommandLineService',
  useFactory: async (pizzasProvidersService: PizzasProvidersService) => {
    await pizzasProvidersService.setDefaultProvider();
    return new CommandLineService(pizzasProvidersService);
  },
  inject: [PizzasProvidersService],
};

@Module({
  modules: [PizzasProvidersModule],
  components: [CommandLineServiceFactory],
})
export class CommandLineModule {
  constructor(@Inject('CommandLineService') commandLineService) {}
}
