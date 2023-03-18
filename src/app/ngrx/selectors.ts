import { createSelector } from '@ngrx/store';
import { AppStateInterface, StoreStateInterface } from '../interfaces';

// state.drinks => the name should be the same as in the module
const selectState = (state: AppStateInterface) => state.drinks;

export const selectIsLoading = createSelector(
  selectState,
  (state: StoreStateInterface) => state.isLoading
);

export const selectDrinks = createSelector(
  selectState,
  (state: StoreStateInterface) => state.drinks
);

export const selectLoadSuccess = createSelector(
  selectState,
  (state: StoreStateInterface) => state.loadSuccess
);

export const selectLoadError = createSelector(
  selectState,
  (state: StoreStateInterface) => state.loadError
);

// Other way
// export const selectRootState = createFeatureSelector<StoreState>('drinks');

// export const selectIsLoading = createSelector(
//   selectRootState,
//   (state: StoreStateInterface) => state.isLoading
// );

// export const selectDrinks = createSelector(
//   selectRootState,
//   (state: StoreStateInterface) => state.drinks
// );

// export const selectLoadSuccess = createSelector(
//   selectRootState,
//   (state: StoreStateInterface) => state.loadSuccess
// );

// export const selectLoadError = createSelector(
//   selectRootState,
//   (state: StoreStateInterface) => state.loadError
// );
