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

  getProvidersShortNames(): string[] {
    return this.providers.map(provider => provider.shortCompanyName);
  }

  getProvidersLongNames(): string[] {
    return this.providers.map(provider => provider.longCompanyName);
  }

  includes(providerShortCompanyName: string): boolean {
    return !!this.providers.find(
      provider => provider.shortCompanyName === providerShortCompanyName
    );
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

  getProviderInstanceByName(providerShortCompanyName: string): PizzasProvider {
    return this.providers.find(
      provider => provider.shortCompanyName === providerShortCompanyName
    );
  }
}
