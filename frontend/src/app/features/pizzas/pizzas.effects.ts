import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { batchActions, BatchAction } from 'redux-batched-actions';

import { PizzasService } from 'app/features/pizzas/pizzas.service';
import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import * as PizzasCategoriesActions from 'app/shared/states/pizzas-categories/pizzas-categories.actions';
import * as UsersActions from 'app/shared/states/users/users.actions';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import * as IngredientsActions from 'app/shared/states/ingredients/ingredients.actions';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: PizzasService) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: true })
  initialLoad$: Observable<BatchAction> = this.actions$
    .ofType(PizzasActions.LOAD_PIZZAS)
    .switchMap((action: Action) =>
      this.pizzaService.getPizzas().map(res => {
        return batchActions([
          new PizzasActions.LoadPizzasSuccess(res.pizzas),
          new PizzasCategoriesActions.LoadPizzasCategoriesSuccess(
            res.pizzasCategories
          ),
          new UsersActions.LoadUsersSuccess(res.users),
          new OrdersActions.LoadOrdersSuccess(res.orders),
          new UiActions.UpdatePizzeriaInformation(res.pizzeria),
          new IngredientsActions.LoadIngredientsSuccess(res.ingredients),
        ]);
      })
    );
}
