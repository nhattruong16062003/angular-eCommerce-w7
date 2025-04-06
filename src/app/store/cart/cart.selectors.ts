import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartAdapter, CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const {
    selectAll: selectAllCartItems,
    selectTotal: selectCartItemsCount
} = cartAdapter.getSelectors(selectCartState);

export const selectSelectedItems = createSelector(
    selectAllCartItems,
    items => items.filter(item => item.selected)
);

export const selectTotalPrice = createSelector(
    selectSelectedItems,
    items => items.reduce((total, item) =>
        total + (item.product.price * item.quantity), 0)
);