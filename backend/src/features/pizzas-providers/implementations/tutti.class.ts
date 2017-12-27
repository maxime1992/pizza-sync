import { Component } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { PizzasProvider } from '../pizzas-provider.class';

export class TuttiProvider extends PizzasProvider {
  readonly longCompanyName = `Tutti Pizza`;
  readonly shortCompanyName = `Tutti`;

  protected phone = '';
  protected url = 'https://www.tutti-pizza.com';
  protected urlsPizzasPages = [
    'https://www.tutti-pizza.com/fr/boutique/pizzas.php',
  ];

  getPhone(): string {
    return this.phone;
  }

  getPizzasCategoriesWrapper($: CheerioStatic): Cheerio {
    return $('#listProduct .row');
  }

  getPizzaCategoryName(pizzaCategoryWrapper: Cheerio): string {
    return pizzaCategoryWrapper.prev().text();
  }

  getPizzasWrappers(pizzaCategoryWrapper: Cheerio): Cheerio {
    return pizzaCategoryWrapper.find('.item');
  }

  getPizzaName(pizzaWrapper: Cheerio): string {
    return pizzaWrapper.find('.item-name').text();
  }

  getPizzaIngredients(pizzaWrapper: Cheerio): string[] {
    const pizzaIngredientsText = pizzaWrapper.find('.item-ingredients').text();

    return pizzaIngredientsText.split(',');
  }

  getPrices(pizzaWrapper: Cheerio, $: CheerioStatic): number[] {
    const pizzaPricesDom = pizzaWrapper
      .find('.item-price')
      // tutti sometimes add "promotion" in `.item-price` and 2 prices
      // are displayed here except that one is striked through
      // so we just keep the one which is not into the `del` component
      .children('del')
      .remove()
      .end();

    return pizzaPricesDom.toArray().map(pizzaPriceDom => {
      const [price] = $(pizzaPriceDom)
        .text()
        .replace(',', '.')
        .split(' ');

      return +price;
    });
  }

  getPizzaImage(
    pizzaWrapper: Cheerio
  ): { localFolderName: string } | { distantUrl: string } {
    const distantUrl = pizzaWrapper.find('.item-img img').attr('src');

    return { distantUrl };
  }
}
