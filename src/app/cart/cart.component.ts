import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../store/cart/cart.state';
import {
  removeFromCart,
  updateQuantity,
  toggleSelection,
  clearCart
} from '../store/cart/cart.actions';
import {
  selectAllCartItems,
  selectTotalPrice
} from '../store/cart/cart.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  constructor(
    private store: Store,
    private router: Router // Inject Router
  ) {
    this.cartItems$ = this.store.select(selectAllCartItems);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  increaseQuantity(id: string, currentQuantity: number) {
    this.store.dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  }

  decreaseQuantity(id: string, currentQuantity: number) {
    const newQuantity = currentQuantity - 1;
    if (newQuantity <= 0) {
      // Nếu số lượng giảm về 0 hoặc âm, xóa sản phẩm
      this.store.dispatch(removeFromCart({ id }));
    } else {
      // Nếu số lượng vẫn lớn hơn 0, cập nhật bình thường
      this.store.dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  }

  removeItem(id: string) {
    this.store.dispatch(removeFromCart({ id }));
  }

  toggleItemSelection(id: string) {
    this.store.dispatch(toggleSelection({ id }));
  }

  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN') + ' ₫';
  }

  // Thêm method backToHome
  backToHome() {
    this.router.navigate(['/']); // Chuyển hướng về trang chủ
  }
}