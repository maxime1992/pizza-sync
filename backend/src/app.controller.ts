import { Controller, Get } from '@nestjs/common';

import { PizzasProvidersService } from './features/pizzas-providers/pizzas-providers.component';
import { UsersService } from './features/models/users/users.component';
import { OrdersService } from './features/models/orders/orders.component';
import { INormalizedInformation } from './features/pizzas-providers/pizzas-providers.interface';
import { IOrdersNormalized } from './features/models/orders/orders.interface';
import { IUsersNormalized } from './features/models/users/users.interface';
import { PizzasService } from './features/models/pizzas/pizzas.component';
import { PizzasCategoriesService } from './features/models/pizzas-categories/pizzas-categories.component';
import { IngredientsService } from './features/models/ingredients/ingredients.component';

@Controller()
export class AppController {
  constructor(
    private pizzasProvidersService: PizzasProvidersService,
    private pizzasService: PizzasService,
    private pizzasCategoriesService: PizzasCategoriesService,
    private usersService: UsersService,
    private ordersService: OrdersService,
    private ingredientsService: IngredientsService
  ) {}

  @Get('initial-state')
  getInitialState() {
    const currentPizzaProviderInformation = this.pizzasProvidersService
      .getCurrentProvider()
      .getPizzeriaInformation();

    return {
      pizzas: this.pizzasService.getNormalizedData(),
      pizzasCategories: this.pizzasCategoriesService.getNormalizedData(),
      users: this.usersService.getNormalizedData(),
      orders: this.ordersService.getNormalizedData(),
      ingredients: this.ingredientsService.getNormalizedData(),
      pizzeria: currentPizzaProviderInformation,
    };
  }
}
