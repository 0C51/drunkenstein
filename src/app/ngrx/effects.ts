import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BartenderService } from '../bartender.service';
import { DrinkModel } from '../interfaces';
import {
  getDrinksActionLoadErrorAction,
  getDrinksActionLoadSuccessAction,
  gettingDrinksAction,
} from './actions';

@Injectable()
export class DrinksEffects {
  constructor(private actions$: Actions, private bartender: BartenderService) {}

  getDrinks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(gettingDrinksAction),
      switchMap(() => {
        return this.bartender.getDrinks().pipe(
          map((drinks: DrinkModel[]) =>
            getDrinksActionLoadSuccessAction({ drinks })
          ),
          catchError(() => of(getDrinksActionLoadErrorAction()))
        );
      })
    );
  });
}
