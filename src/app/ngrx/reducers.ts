import { createReducer, on } from '@ngrx/store';
import { StoreState } from '../interfaces';
import { getDrinksAction } from './actions';

const initialState: StoreState = {
  isLoading: false,
  drinks: [],
  loadSuccess: null,
  loadError: null,
};

export const reducers = createReducer(
  initialState,
  on(getDrinksAction, (state) => ({ ...state, isLoading: true }))
);
