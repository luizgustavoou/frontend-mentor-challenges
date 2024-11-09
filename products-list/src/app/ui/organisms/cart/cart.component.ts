import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../application/states/app.state';
import { Product, ProductAmount } from '../../../domain/entities/products';
import {
  selectCartProducts,
  selectCartProductsAmount,
  selectCartTotal,
} from '../../../application/selectors/cart.selector';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartProducts$: Observable<Product[]>;
  cartProductsLength$: Observable<number>;
  cartProductsAmount$: Observable<ProductAmount[]>;

  constructor(private store: Store<AppState>) {
    this.cartProducts$ = this.store.select(selectCartProducts);
    this.cartProductsLength$ = this.store.select(selectCartTotal);
    this.cartProductsAmount$ = this.store.select(selectCartProductsAmount);
  }

  handleRemoveProduct(product: Product) {
  }
}
