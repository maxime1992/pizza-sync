import { Component } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { PizzasProvider } from '../pizzas-provider.class';

export class OrmeauProvider extends PizzasProvider {
  readonly longCompanyName = `L'Ormeau`;
  readonly shortCompanyName = `Ormeau`;

  protected phone = '05 61 34 86 23';
  protected url = 'http://www.pizzadelormeau.com';
  protected urlsPizzasPages = [this.url];

  getPhone(): string {
    return this.phone;
  }

  getPizzasCategoriesWrapper($: CheerioStatic): Cheerio {
    return $('.section_wrapper').find('.one');
  }

  getPizzaCategoryName(pizzaCategoryWrapper: Cheerio): string {
    return pizzaCategoryWrapper.find('h2').text();
  }

  getPizzasWrappers(pizzaCategoryWrapper: Cheerio): Cheerio {
    return pizzaCategoryWrapper.nextUntil('.one, .pad50');
  }

  getPizzaName(pizzaWrapper: Cheerio): string {
    return pizzaWrapper
      .find('.big')
      .text()
      .replace(/ +\(.*\)/, '');
  }

  getPizzaIngredients(pizzaWrapper: Cheerio): string[] {
    const pizzaIngredientsText = pizzaWrapper
      .find('.midbig')
      .text()
      .replace('.', '')
      .replace(', ', ',')
      .trim();

    return pizzaIngredientsText.split(',');
  }

  getPrices(pizzaWrapper: Cheerio, $: CheerioStatic): number[] {
    return pizzaWrapper
    .find('.pizzap')
    .text()
    .replace(/,/g, '.')
    .match(/\d+(\.\d+)?/g)
    .map(Number);
  }

  getPizzaImage(): { localFolderName: string } | { distantUrl: string } {
    return { localFolderName: 'l-ormeau' };
  }
}
