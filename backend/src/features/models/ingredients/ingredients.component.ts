import { Component } from '@nestjs/common';

import { NormalizedModel } from '../normalized-model.class';
import {
  IIngredientWithId,
  IIngredientWithoutId,
} from './ingredients.interface';

@Component()
export class IngredientsService extends NormalizedModel<IIngredientWithoutId> {
  protected sort = true;

  constructor() {
    super('ingredientId');
  }

  // we want to order them by name, to display the list
  // of ingredients in the frontend and propose to filter by ingredients
  protected sortBy(ing1, ing2) {
    return ing1.name.localeCompare(ing2.name);
  }
}
