import { Injectable } from '@nestjs/common';

import { NormalizedModel } from '../normalized-model.class';
import { IPizzaWithoutId } from './pizzas.interface';

@Injectable()
export class PizzasService extends NormalizedModel<IPizzaWithoutId> {
  constructor() {
    super('pizzaId');
  }
}
