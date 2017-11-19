import { Component } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { PizzasProvider } from '../pizzas-provider.class';

export class OrmeauProvider extends PizzasProvider {
  readonly longCompanyName = `L'Ormeau`;
  readonly shortCompanyName = `Ormeau`;

  protected phone = '05 61 34 86 23';
  protected url = 'http://www.pizzadelormeau.com';
  protected urlsPizzasPages = ['http://www.pizzadelormeau.com/nos-pizzas/'];

  getPhone(): string {
    return this.phone;
  }

  getPizzasCategoriesWrapper($: CheerioStatic): Cheerio {
    return $('.entry-content .section');
  }

  getPizzaCategoryName(pizzaCategoryWrapper: Cheerio): string {
    return pizzaCategoryWrapper
      .find('.title')
      .children()
      .remove()
      .end()
      .text();
  }

  getPizzasWrappers(pizzaCategoryWrapper: Cheerio): Cheerio {
    return pizzaCategoryWrapper.find('.corps');
  }

  getPizzaName(pizzaWrapper: Cheerio): string {
    return pizzaWrapper
      .find('.nom')
      .children()
      .remove()
      .end()
      .text();
  }

  getPizzaIngredients(pizzaWrapper: Cheerio): string[] {
    const pizzaIngredientsText = pizzaWrapper
      .find('.composition')
      .text()
      .replace('.', '')
      .replace(', ', ',')
      .trim();

    return pizzaIngredientsText.split(',');
  }

  getPrices(pizzaWrapper: Cheerio, $: CheerioStatic): number[] {
    const pizzaPricesDom = pizzaWrapper.find('.prix');

    return pizzaPricesDom.toArray().map(pizzaPriceDom => {
      const price = $(pizzaPriceDom)
        .children()
        .remove()
        .end()
        .text()
        .replace(',', '.');

      return +price;
    });
  }

  getPizzaImage(): { localFolderName: string } | { distantUrl: string } {
    return { localFolderName: 'l-ormeau' };
  }
}
