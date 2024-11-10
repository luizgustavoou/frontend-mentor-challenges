import { Component } from '@angular/core';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartProduct, Product } from '../../../domain/entities/products';
import { ProductsService } from '../../../application/services/products/products.service';
import { Store } from '@ngrx/store';
import { lastValueFrom, map, mergeMap, Observable } from 'rxjs';
import { AppState } from '../../../application/states/app.state';
import { selectCartProducts } from '../../../application/selectors/cart.selector';
import {
  addProduct,
  removeProduct,
} from '../../../application/actions/cart.action';

@Component({
  selector: 'app-desserts-list',
  standalone: true,
  imports: [AppButtonComponent, MatIconModule, CommonModule],
  templateUrl: './desserts-list.component.html',
  styleUrl: './desserts-list.component.scss',
})
export class DessertsListComponent {
  cartProducts$: Observable<CartProduct[]>;

  products: Product[] = [];

  constructor(
    private readonly productsService: ProductsService,
    private store: Store<AppState>
  ) {
    this.cartProducts$ = this.store.select(selectCartProducts);
  }

  async ngOnInit() {
    this.products = await this.productsService.getProducts();
  }

  productInCart(id: string): Observable<CartProduct | undefined> {
    return this.cartProducts$.pipe(
      map((cartProducts) =>
        cartProducts.find((cartProduct) => cartProduct.id === id)
      )
    );
  }

  handleAddProduct(event: MouseEvent, product: Product) {
    this.store.dispatch(addProduct({ product }));
  }

  handleRemoveProduct(event: MouseEvent, product: Product) {
    this.store.dispatch(removeProduct({ id: product.id }));
  }
}
