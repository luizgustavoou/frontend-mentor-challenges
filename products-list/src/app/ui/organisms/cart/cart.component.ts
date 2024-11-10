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
import { clearProduct } from '../../../application/actions/cart.action';
import { AppButtonComponent } from "../../atoms/app-button/app-button.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatIconModule, AppButtonComponent],
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
    this.store.dispatch(clearProduct({ id: product.id }));
  }

  getTotal(): number {
    let total = 0;
    this.cartProductsAmount$.subscribe(products => {
      total = products.reduce((acc, product) => acc + (product.price * product.amount), 0);
    });
    return total;
  }
}
