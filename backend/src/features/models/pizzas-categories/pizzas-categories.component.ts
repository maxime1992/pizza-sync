import { Injectable } from '@nestjs/common';

import { NormalizedModel } from '../normalized-model.class';
import { IPizzaCategoryWithoutId } from './pizzas-categories.interface';

@Injectable()
export class PizzasCategoriesService extends NormalizedModel<
  IPizzaCategoryWithoutId
> {
  constructor() {
    super('pizzaCategoryId');
  }
}
