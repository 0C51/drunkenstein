import { createSelector } from '@ngrx/store';
import { StoreState } from '../interfaces';

export const selectIsLoading = createSelector(
  (state: StoreState) => state.isLoading,
  (isLoading) => isLoading
);

export const selectDrinks = createSelector(
  (state: StoreState) => state.drinks,
  (drinks) => drinks
);

export const selectLoadSuccess = createSelector(
  (state: StoreState) => state.loadSuccess,
  (loadSuccess) => loadSuccess
);

export const selectLoadError = createSelector(
  (state: StoreState) => state.loadError,
  (loadError) => loadError
);
