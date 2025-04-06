import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart/cart.actions';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private store: Store) { }

  addToCart() {
    this.store.dispatch(addToCart({ product: this.product }));
  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' ₫';
  }
}