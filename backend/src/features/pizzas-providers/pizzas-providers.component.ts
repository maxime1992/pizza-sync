import { Component } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { normalize, schema } from 'normalizr';

import { PizzasProvider, BasicPizzasProvider } from './pizzas-provider.class';
import { OrmeauProvider } from './implementations/ormeau.class';
import { OrmeauMockProvider } from './implementations/ormeau.mock';
import { TuttiProvider } from './implementations/tutti.class';
import { PizzasService } from '../models/pizzas/pizzas.component';
import { PizzasCategoriesService } from '../models/pizzas-categories/pizzas-categories.component';
import { IngredientsService } from '../models/ingredients/ingredients.component';
import { renameKeysInObject } from './../../helpers/object.helper';
import {
  IPizzeriaNestedFkWithoutId,
  IPizzeriaNestedFkWithId,
  INormalizedInformation,
} from './pizzas-providers.interface';
import {
  IPizzaCategoryWithId,
  IPizzasCategoriesNormalized,
} from '../models/pizzas-categories/pizzas-categories.interface';
import {
  IPizzaWithId,
  IPizzasNormalized,
} from '../models/pizzas/pizzas.interface';
import {
  cleanIngredientName,
  cleanIngredientNameAsId,
} from '../../helpers/string.helper';

@Component()
export class PizzasProvidersService {
  private providers: BasicPizzasProvider[];
  private currentProvider: BasicPizzasProvider;

  constructor(
    private pizzasService: PizzasService,
    private pizzasCategoriesService: PizzasCategoriesService,
    private ingredientsService: IngredientsService
  ) {
    // list all the providers within the array
    const providers = [OrmeauMockProvider, OrmeauProvider, TuttiProvider];

    this.providers = providers.map(PizzaProvider => new PizzaProvider());
  }

  getProviders(): BasicPizzasProvider[] {
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

  setDefaultProvider(): Promise<void> {
    let conf: { defaultProvider: string };
    let defaultProvider: BasicPizzasProvider;

    try {
      conf = require('../../../conf.json');
      defaultProvider = this.getProviderInstanceByName(conf.defaultProvider);

      if (!defaultProvider) {
        throw new Error(
          `Couldn't read the conf.json or the provider wasn't found`
        );
      }
    } catch (e) {
      // fallback to the first provider of the list
      const [firstProvider] = this.providers;
      defaultProvider = firstProvider;
    }

    return this.setCurrentProvider(defaultProvider);
  }

  async setCurrentProvider(provider: BasicPizzasProvider): Promise<void> {
    const pizzaProviderInfo = await provider.fetchAndParseData();

    // after you've implemented the parsing of a given pizza provider
    // if you want to easily create a mock, you can
    // - log the `pizzaProviderInfo`
    // - copy the result from the console into a new file in `/backend/mocks/new-pizza-provider.mock.ts`
    // - create a new pizza provider mock in `/backend/src/features/pizzas-providers/implementations/new-pizza-provider.mock.ts`
    // - add it to the list of providers within the constructor of this file
    // console.log(JSON.stringify(pizzaProviderInfo));

    // add IDs and normalize data
    const pizzaProviderInfoWithIds = this.addIdToPizzasCategoriesPizzasAndIngredients(
      pizzaProviderInfo.pizzeria
    );
    const pizzaProviderInfoNormalized = this.normalizePizzasCategoriesPizzasAndIngredients(
      pizzaProviderInfoWithIds.pizzeria
    );

    // save the normalized data
    this.pizzasService.setNormalizedData(pizzaProviderInfoNormalized.pizzas);
    this.pizzasCategoriesService.setNormalizedData(
      pizzaProviderInfoNormalized.pizzasCategories
    );
    this.ingredientsService.setNormalizedData(
      pizzaProviderInfoNormalized.ingredients
    );

    this.currentProvider = provider;
  }

  getCurrentProvider(): BasicPizzasProvider {
    return this.currentProvider;
  }

  getProviderInstanceByName(
    providerShortCompanyName: string
  ): BasicPizzasProvider {
    return this.providers.find(
      provider => provider.shortCompanyName === providerShortCompanyName
    );
  }

  // a pizza provider is just parsing the pizzas categories
  // with the pizzas and the ingredients
  // they do not have IDs and before normalizing these data
  // we need to give them IDs
  private addIdToPizzasCategoriesPizzasAndIngredients(
    pizzeria: IPizzeriaNestedFkWithoutId
  ): { pizzeria: IPizzeriaNestedFkWithId } {
    return {
      pizzeria: {
        ...pizzeria,
        id: uuid(),
        pizzasCategories: pizzeria.pizzasCategories.map(pizzaCategory => ({
          ...pizzaCategory,
          id: uuid(),
          pizzas: pizzaCategory.pizzas.map(pizza => ({
            ...pizza,
            id: uuid(),
            ingredients: pizza.ingredients.map(ingredient => ({
              ...ingredient,
              name: cleanIngredientName(ingredient.name),
              // here we set the temporary ID as the cleaned ingredient name
              // so we don't get duplicates for the ingredients
              id: cleanIngredientNameAsId(ingredient.name),
            })),
          })),
        })),
      },
    };
  }

  private normalizePizzasCategoriesPizzasAndIngredients(
    pizzeria: IPizzeriaNestedFkWithId
  ) {
    // get the schema to normalize the data
    const normalizedData = this.getNormalizrSchema(pizzeria);

    // normalize the data
    const {
      pizzasCategories,
      pizzasCategoriesIds,
    } = this.getPizzasCategoriesByEntitiesAndIds(normalizedData.pizzasCategories);

    const { pizzasById, pizzasIds } = this.getPizzasByIdAndIds(
      normalizedData.pizzas
    );

    return {
      pizzeria: {
        name: pizzeria.name,
        phone: pizzeria.phone,
        url: pizzeria.url,
      },
      pizzasCategories: {
        entities: pizzasCategories,
        ids: pizzasCategoriesIds,
      },
      pizzas: {
        entities: pizzasById,
        ids: pizzasIds,
      },
      ingredients: normalizedData.ingredients,
    };
  }

  // a pizza provider returns a structure where
  // a pizza has a key `ingredients`
  // but we want to rename it to igredientsIds
  private getPizzasByIdAndIds(pizzas: IPizzasNormalized) {
    const pizzasIds = pizzas.ids;

    const pizzasById: {
      [key: string]: IPizzaWithId;
    } = renameKeysInObject(
      pizzas.entities,
      pizzas.ids,
      'ingredients',
      'ingredientsIds'
    );

    return { pizzasById, pizzasIds };
  }

  // a pizza provider returns a structure where
  // a pizza categorie has a key `pizzas`
  // but we want to rename it to pizzasIds
  private getPizzasCategoriesByEntitiesAndIds(
    pizzasCategories: IPizzasCategoriesNormalized
  ) {
    const pizzasCategoriesIds = pizzasCategories.ids;

    const pizzasCategoriesEntities: {
      [key: string]: IPizzaCategoryWithId;
    } = renameKeysInObject(
      pizzasCategories.entities,
      pizzasCategories.ids,
      'pizzas',
      'pizzasIds'
    );

    return {
      pizzasCategories: pizzasCategoriesEntities,
      pizzasCategoriesIds,
    };
  }

  private getNormalizrSchema(
    pizzeria: IPizzeriaNestedFkWithId
  ): INormalizedInformation {
    const ingredientEntity = new schema.Entity('ingredients');

    const pizzaEntity = new schema.Entity('pizzas', {
      ingredients: [ingredientEntity],
    });

    const pizzaCategorieEntity = new schema.Entity('pizzasCategories', {
      pizzas: [pizzaEntity],
    });

    const normalizedData = normalize(pizzeria.pizzasCategories, [
      pizzaCategorieEntity,
    ]);

    return {
      pizzeria: {
        name: pizzeria.name,
        phone: pizzeria.phone,
        url: pizzeria.url,
      },
      pizzas: {
        entities: normalizedData.entities.pizzas,
        ids: Object.keys(normalizedData.entities.pizzas),
      },
      pizzasCategories: {
        entities: normalizedData.entities.pizzasCategories,
        ids: Object.keys(normalizedData.entities.pizzasCategories),
      },
      ingredients: {
        entities: normalizedData.entities.ingredients,
        ids: Object.keys(normalizedData.entities.ingredients),
      },
    };
  }
}
