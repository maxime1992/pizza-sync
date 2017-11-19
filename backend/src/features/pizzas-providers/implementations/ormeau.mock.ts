import { PizzaProviderMock } from '../pizzas-provider.class';
import { ormeauMock } from '../../../../mocks/ormeau.mock';

export class OrmeauMockProvider extends PizzaProviderMock {
  shortCompanyName = `Ormeau-Mock`;

  constructor() {
    super(ormeauMock.pizzeria);
  }
}
