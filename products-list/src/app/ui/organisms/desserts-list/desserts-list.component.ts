import { Component } from '@angular/core';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Product } from '../../../domain/entities/products';
import { ProductsService } from '../../../application/services/products/products.service';

@Component({
  selector: 'app-desserts-list',
  standalone: true,
  imports: [AppButtonComponent, MatIconModule, CommonModule],
  templateUrl: './desserts-list.component.html',
  styleUrl: './desserts-list.component.scss',
})
export class DessertsListComponent {
  products: Product[] = [];

  constructor(private readonly productsService: ProductsService) {}

  async ngOnInit() {
    this.products = await this.productsService.getProducts();
  }
}
