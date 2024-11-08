import { ICartState } from './cart.state';
import { ICounterState } from './counter.state';

export interface AppState {
  counter: ICounterState;
  cart: ICartState
}
