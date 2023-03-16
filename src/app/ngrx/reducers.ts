import { createReducer, on } from '@ngrx/store';
import { StoreState } from '../interfaces';
import {
  getDrinksActionLoadError,
  getDrinksActionLoadSuccess,
  gettingDrinksAction,
} from './actions';

const initialState: StoreState = {
  isLoading: false,
  drinks: [],
  loadSuccess: null,
  loadError: null,
};

export const reducers = createReducer(
  initialState,
  on(gettingDrinksAction, (state) => ({ ...state, isLoading: true })),
  on(getDrinksActionLoadSuccess, (state, { drinks }) => ({
    ...state,
    drinks,
    isLoading: false,
    loadSuccess: true,
  })),
  on(getDrinksActionLoadError, (state) => ({
    ...state,
    isLoading: false,
    loadError: true,
  }))
);
