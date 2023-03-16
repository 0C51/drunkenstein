import { createAction, props } from '@ngrx/store';
import { ActionType, DrinkModel } from '../interfaces';

export const gettingDrinksAction = createAction(ActionType.gettingDrinks);
export const getDrinksActionLoadSuccess = createAction(
  ActionType.getDrinksLoadSuccess,
  props<{ drinks: DrinkModel[] }>()
);
export const getDrinksActionLoadError = createAction(
  ActionType.getDrinksLoadError
);
