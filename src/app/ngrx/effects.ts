import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BartenderService } from '../bartender.service';
import { ActionTypeEnum } from '../interfaces';
import { gettingDrinksAction } from './actions';

@Injectable()
export class DrinksEffects {
  constructor(private actions$: Actions, private bartender: BartenderService) {}

  getDrinks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(gettingDrinksAction),
      switchMap(() => {
        return this.bartender.getDrinks().pipe(
          map((drinks) => ({
            type: ActionTypeEnum.getDrinksLoadSuccess,
            drinks,
          })),
          catchError(() => of({ type: ActionTypeEnum.getDrinksLoadError }))
        );
      })
    );
  });
}
