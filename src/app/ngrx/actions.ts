import { createAction, props } from '@ngrx/store';
import { ActionTypeEnum, DrinkModel } from '../interfaces';

export const gettingDrinksAction = createAction(ActionTypeEnum.gettingDrinks);
export const getDrinksActionLoadSuccessAction = createAction(
  ActionTypeEnum.getDrinksLoadSuccess,
  props<{ drinks: DrinkModel[] }>()
);
export const getDrinksActionLoadErrorAction = createAction(
  ActionTypeEnum.getDrinksLoadError
);

export const addDrinkAction = createAction(
  ActionTypeEnum.addDrink,
  props<{ name: string; price: number }>()
);

export const editDrinkAction = createAction(
  ActionTypeEnum.editDrink,
  props<{ id: string; name: string; price: number }>()
);

export const deleteDrinkAction = createAction(
  ActionTypeEnum.deleteDrink,
  props<{ id: string }>()
);
