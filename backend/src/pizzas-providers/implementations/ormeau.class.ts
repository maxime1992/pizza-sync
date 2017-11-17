import { Component } from '@nestjs/common';

import { PizzasProvider } from '../pizzas-provider.class';

export class OrmeauProvider extends PizzasProvider {
  readonly companyName = `L'Ormeau`;

  fetchParseAndUpdate() {
    return new Promise((resolve: (a: OrmeauProvider) => void, reject) =>
      setTimeout(() => resolve(this), 1000)
    );
  }

  getCompleteAndNormalizedInformation() {
    // TODO: remove mock and return real data
    return {
      pizzeria: {
        name: this.companyName,
        phone: '0600000000',
        url: 'http://www.pizzadelormeau.com/',
      },
      pizzas: [],
      pizzasCategories: [],
      ingredients: [],
    };
  }
}
