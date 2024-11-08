// counter.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICounterState } from '../states/counter.state';

export const selectCounterState =
  createFeatureSelector<ICounterState>('counter');

export const selectCount = createSelector(
  selectCounterState,
  (state: ICounterState) => state.count
);
