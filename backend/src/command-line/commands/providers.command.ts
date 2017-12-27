import { Command } from '../command.class';
import { PizzasProvidersService } from '../../features/pizzas-providers/pizzas-providers.component';

export class ProvidersCommand extends Command {
  titleWithParams = 'providers';
  description = 'List available pizzas providers';

  constructor(
    private vorpal: any,
    private pizzasProvidersService: PizzasProvidersService
  ) {
    super(vorpal);
  }

  action(
    _,
    callback: () => void,
    vorpalContext: { log: (msg: string) => void }
  ) {
    this.displayFormattedProviders(vorpalContext);
    callback();
  }

  private displayFormattedProviders(vorpalContext): void {
    vorpalContext.log('Available providers (current between curly brackets)');

    this.getFormattedProviders().forEach(provider =>
      vorpalContext.log(provider)
    );
  }

  // returns an array of providers' name with the
  // currently selected between brackets
  private getFormattedProviders(): string[] {
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
