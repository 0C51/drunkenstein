import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BartenderService } from '../bartender.service';
import { ActionType } from '../interfaces';
import { gettingDrinksAction } from './actions';

@Injectable()
export class DrinksEffects {
  constructor(private actions$: Actions, private bartender: BartenderService) {}

  // I commented out this so we can see 'isLoading'
  // getDrinks$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(gettingDrinksAction),
  //     switchMap(() => {
  //       return this.bartender.getDrinks().pipe(
  //         map((drinks) => ({ type: ActionType.getDrinksLoadSuccess, drinks })),
  //         catchError(() => of({ type: ActionType.getDrinksLoadError }))
  //       );
  //     })
  //   );
  // });
}
