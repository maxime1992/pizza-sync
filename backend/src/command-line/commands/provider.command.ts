import { Command } from '../command.class';
import { PizzasProvidersService } from '../../features/pizzas-providers/pizzas-providers.component';
import { UsersService } from '../../features/models/users/users.component';

export class ProviderCommand extends Command {
  titleWithParams = 'provider <provider>';
  description = 'Set the current provider';

  constructor(
    private vorpal: any,
    private pizzasProvidersService: PizzasProvidersService,
    private usersService: UsersService
  ) {
    super(vorpal);
  }

  getAutocomplete(): string[] {
    return this.pizzasProvidersService.getProvidersShortNames();
  }

  action(
    args: { provider: string },
    callback: () => void,
    vorpalContext: { log: (msg: string) => void }
  ) {
    const newProviderName = args.provider;

    if (this.usersService.getNbConnections()) {
      console.error(
        'Some users are already connected, you shall stop server before'
      );
      return callback();
    }

    if (!newProviderName) {
      vorpalContext.log('You need to select a provider');
      return callback();
    }

    if (!this.pizzasProvidersService.includes(newProviderName)) {
      vorpalContext.log('Unknown provider');
      return callback();
    }

    const newProviderInstance = this.pizzasProvidersService.getProviderInstanceByName(
      newProviderName
    );

    this.pizzasProvidersService.setCurrentProvider(newProviderInstance);
    return callback();
  }
}
