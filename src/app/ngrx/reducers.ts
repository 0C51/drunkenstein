import { createReducer, on } from '@ngrx/store';
import { DrinkModel, StoreStateInterface } from '../interfaces';
import {
  addDrinkAction,
  deleteDrinkAction,
  editDrinkAction,
  getDrinksActionLoadErrorAction,
  getDrinksActionLoadSuccessAction,
  gettingDrinksAction,
} from './actions';

const initialState: StoreStateInterface = {
  isLoading: false,
  drinks: [],
  loadSuccess: null,
  loadError: null,
};

export const reducers = createReducer(
  initialState,
  on(gettingDrinksAction, (state) => ({ ...state, isLoading: true })),

  on(getDrinksActionLoadSuccessAction, (state, { drinks }) => {
    const drinksTemp: DrinkModel[] = JSON.parse(JSON.stringify(drinks));
    const drinksMapped = drinksTemp.map((drink) => {
      drink.price = drink.price ?? drink.name.length ?? 0;
      return drink;
    });
    return {
      ...state,
      drinks: drinksMapped,
      isLoading: false,
      loadSuccess: true,
    };
  }),

  on(getDrinksActionLoadErrorAction, (state) => ({
    ...state,
    isLoading: false,
    loadError: true,
  })),

  on(addDrinkAction, (state, { name, price }) => {
    const drinksTemp: DrinkModel[] = JSON.parse(JSON.stringify(state.drinks));
    drinksTemp.push({
      id: Date.now().toString(),
      name,
      price,
    });
    return {
      ...state,
      drinks: drinksTemp,
    };
  }),

  on(editDrinkAction, (state, { id, name, price }) => {
    const drinksTemp: DrinkModel[] = JSON.parse(JSON.stringify(state.drinks));
    const editIndex = drinksTemp.findIndex(
      (drink: DrinkModel) => drink.id === id
    );
    if (editIndex !== -1) {
      const drinkToEdit = drinksTemp[editIndex];
      drinkToEdit.name = name;
      drinkToEdit.price = price;
    }
    return {
      ...state,
      drinks: drinksTemp,
    };
  }),

  on(deleteDrinkAction, (state, { id }) => {
    const drinksTemp: DrinkModel[] = JSON.parse(JSON.stringify(state.drinks));
    const toBeRemovedId = drinksTemp.findIndex(
      (drink: DrinkModel) => drink.id === id
    );
    if (toBeRemovedId !== -1) {
      drinksTemp.splice(toBeRemovedId, 1);
    }
    return {
      ...state,
      drinks: drinksTemp,
    };
  })
);
