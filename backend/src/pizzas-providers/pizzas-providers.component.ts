import { PizzasProvider } from './pizzas-provider.class';
import { OrmeauProvider } from './implementations/ormeau.class';

export class PizzasProvidersService {
  private providers: PizzasProvider[];
  private currentProvider: PizzasProvider;

  constructor() {
    const providers = [OrmeauProvider];

    this.providers = providers.map(PizzaProvider => new PizzaProvider());
  }

  getProviders(): PizzasProvider[] {
    return this.providers;
  }

  async setDefaultProvider(): Promise<void> {
    const [firstProvider] = this.providers;
    await this.setCurrentProvider(firstProvider);
  }

  async setCurrentProvider(provider: PizzasProvider): Promise<void> {
    await provider.fetchParseAndUpdate();

    this.currentProvider = provider;
  }

  getCurrentProvider(): PizzasProvider {
    return this.currentProvider;
  }
}
