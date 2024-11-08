import { createReducer, on } from '@ngrx/store';
import { Product } from '../../domain/entities/products';
import { ICartState } from '../states/cart.state';
import { addProduct, clear, removeProduct } from '../actions/cart.action';

export const initialState: ICartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => ({
    products: [...state.products, product],
  })),
  on(removeProduct, (state, { id }) => ({
    products: state.products.filter((product: Product) => product.id !== id),
  })),
  on(clear, () => ({ products: [] }))
);
