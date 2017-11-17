import * as _vorpal from 'vorpal';

import { PizzasProvidersService } from '../pizzas-providers/pizzas-providers.component';
import { PizzasProvidersModule } from '../pizzas-providers/pizzas-providers.module';

export class CommandLineService {
  private vorpal = _vorpal();

  constructor(private pizzasProvidersService: PizzasProvidersService) {
    this.registerProvidersCommand();

    this.vorpal.delimiter('pizza-sync$').show();
  }

  private registerProvidersCommand() {
    const self = this;

    this.vorpal
      .command('providers', 'List available pizzas providers')
      .action(function(args, callback) {
        self.displayFormattedProviders(this);

        return callback();
      });
  }

  private displayFormattedProviders(vorpalContext) {
    vorpalContext.log('Available providers (current between curly brackets)');

    this.getFormattedProviders().forEach(provider =>
      vorpalContext.log(provider)
    );
  }

  // returns an array of providers' name with the
  // currently selected between brackets
  private getFormattedProviders() {
    const providers = this.pizzasProvidersService.getProviders();
    const currentProvider = this.pizzasProvidersService.getCurrentProvider();

    return providers.map(
      provider =>
        provider === currentProvider
          ? `- { ${provider.companyName} }`
          : `- ${provider.companyName}`
    );
  }
}
