import { Component } from '@nestjs/common';

import { NormalizedModel } from '../normalized-model.class';
import {
  IPizzaCategoryWithId,
  IPizzaCategoryWithoutId,
} from './pizzas-categories.interface';

@Component()
export class PizzasCategoriesService extends NormalizedModel<
  IPizzaCategoryWithoutId
> {
  constructor() {
    super('pizzaCategoryId');
  }
}
