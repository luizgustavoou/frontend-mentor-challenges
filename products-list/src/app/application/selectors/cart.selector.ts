import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICartState } from '../states/cart.state';
import { Product, ProductAmount } from '../../domain/entities/products';



export const selectCartState = createFeatureSelector<ICartState>('cart');

export const selectCartProducts = createSelector(
  selectCartState,
  (state: ICartState) => state.products
);

export const selectCartProductsAmount = createSelector(
  selectCartState,
  (state: ICartState) => {
    const obj = state.products.reduce(
      (acc: Record<string, ProductAmount>, product) => {
        if (!acc[product.id]) {
          acc[product.id] = {
            ...product,
            amount: 1,
          };
        } else {
          acc[product.id] = {
            ...product,
            amount: (acc[product.id] as ProductAmount).amount + 1,
          };
        }

        return acc;
      },
      {}
    );

    return Object.values(obj);
  }
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state: ICartState) => state.products.length
);
