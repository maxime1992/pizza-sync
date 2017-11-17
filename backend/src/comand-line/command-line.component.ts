import * as _vorpal from 'vorpal';

import { PizzasProvidersService } from '../pizzas-providers/pizzas-providers.component';
import { PizzasProvidersModule } from '../pizzas-providers/pizzas-providers.module';

export class CommandLineService {
  private vorpal = _vorpal();

  constructor(private pizzasProvidersService: PizzasProvidersService) {
    this.registerProviderCommand();
    this.registerProvidersCommand();

    this.vorpal.delimiter('pizza-sync$').show();
  }

  private registerProviderCommand() {
    const self = this;

    this.vorpal
      .command('provider <provider>', 'Change current provider')
      .description('Set the current provider')
      .autocomplete(this.pizzasProvidersService.getProvidersShortNames())
      .action(function(args, callback) {
        const newProviderName = args.provider;

        if (!newProviderName) {
          this.log('You need to select a provider');
          return callback();
        }

        if (!self.pizzasProvidersService.includes(newProviderName)) {
          this.log('Unknown provider');
          return callback();
        }

        const newProviderInstance = self.pizzasProvidersService.getProviderInstanceByName(
          newProviderName
        );

        self.pizzasProvidersService.setCurrentProvider(newProviderInstance);
        return callback();
      });
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
          ? `- { ${provider.longCompanyName} }`
          : `- ${provider.longCompanyName}`
    );
  }
}
