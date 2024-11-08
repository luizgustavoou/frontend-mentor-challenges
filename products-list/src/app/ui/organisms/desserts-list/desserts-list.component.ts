import { Component } from '@angular/core';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Product } from '../../../domain/entities/products';
import { ProductsService } from '../../../application/services/products/products.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../application/states/app.state';
import { selectCartProducts } from '../../../application/selectors/cart.selector';
import { addProduct } from '../../../application/actions/cart.action';

@Component({
  selector: 'app-desserts-list',
  standalone: true,
  imports: [AppButtonComponent, MatIconModule, CommonModule],
  templateUrl: './desserts-list.component.html',
  styleUrl: './desserts-list.component.scss',
})
export class DessertsListComponent {
  cartProducts$: Observable<Product[]>;

  products: Product[] = [];

  constructor(
    private readonly productsService: ProductsService,
    private store: Store<AppState>
  ) {
    this.cartProducts$ = this.store.select(selectCartProducts);
  }

  handleClick(event: MouseEvent, product: Product) {
    this.store.dispatch(addProduct({ product }));
  }

  async ngOnInit() {
    this.products = await this.productsService.getProducts();
  }
}
