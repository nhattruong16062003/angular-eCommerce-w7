import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItemsCount } from '../store/cart/cart.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItemsCount$: Observable<number>;

  constructor(private store: Store) {
    this.cartItemsCount$ = this.store.select(selectCartItemsCount);
  }
}