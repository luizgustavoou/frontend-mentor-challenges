import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct, Product } from '../../../domain/entities/products';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatIconModule, CommonModule, AppButtonComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() product!: Product;
  @Input() cartProduct: CartProduct | null | undefined;

  @Output() addProduct = new EventEmitter<MouseEvent>();
  @Output() removeProduct = new EventEmitter<MouseEvent>();

  onAddProduct(event: MouseEvent) {
    this.addProduct.emit(event);
  }

  onRemoveProduct(event: MouseEvent) {
    this.removeProduct.emit(event);
  }
}
