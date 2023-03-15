import { createAction } from '@ngrx/store';
import { ActionType } from '../interfaces';

export const getDrinksAction = createAction(ActionType.getDrinks);
