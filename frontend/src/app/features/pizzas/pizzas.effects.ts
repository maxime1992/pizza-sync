import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { BatchAction, batchActions } from 'redux-batched-actions';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { PizzasService } from 'app/features/pizzas/pizzas.service';
import * as IngredientsActions from 'app/shared/states/ingredients/ingredients.actions';
import * as OrdersActions from 'app/shared/states/orders/orders.actions';
import * as PizzasCategoriesActions from 'app/shared/states/pizzas-categories/pizzas-categories.actions';
import * as PizzasActions from 'app/shared/states/pizzas/pizzas.actions';
import * as UiActions from 'app/shared/states/ui/ui.actions';
import * as UsersActions from 'app/shared/states/users/users.actions';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: PizzasService) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: true })
  initialLoad$: Observable<BatchAction> = this.actions$
    .ofType(PizzasActions.LOAD_PIZZAS)
    .pipe(
      switchMap((action: Action) =>
        this.pizzaService.getPizzas().pipe(
          map(res => {
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
        )
      )
    );
}
