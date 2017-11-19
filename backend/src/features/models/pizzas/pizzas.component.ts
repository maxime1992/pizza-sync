import { Component } from '@nestjs/common';

import { NormalizedModel } from '../normalized-model.class';
import { IPizzaWithId, IPizzaWithoutId } from './pizzas.interface';

@Component()
export class PizzasService extends NormalizedModel<IPizzaWithoutId> {
  constructor() {
    super('pizzaId');
  }
}
