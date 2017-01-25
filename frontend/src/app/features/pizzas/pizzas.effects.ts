import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { batchActions } from 'redux-batched-actions';

import { Pizzas } from './../../shared/state/pizzas/pizzas.reducer';
import { PizzasService } from './pizzas.service';

@Injectable()
export class PizzasEffects {
  constructor(private _actions$: Actions, private _pizzaService: PizzasService) { }

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: true }) initialLoad$: Observable<Action> = this._actions$
    .ofType(Pizzas.LOAD_PIZZAS)
    .switchMap((action: Action) =>
      this._pizzaService.getPizzas()
        .map(res => {
          return {
            type: Pizzas.LOAD_PIZZAS_SUCCESS,
            payload: res.pizzas
          };
        })
    );
}
