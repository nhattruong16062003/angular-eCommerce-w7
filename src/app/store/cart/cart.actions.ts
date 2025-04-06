import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const addToCart = createAction(
    '[Cart] Add to Cart',
    props<{ product: Product }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove from Cart',
    props<{ id: string }>()
);

export const updateQuantity = createAction(
    '[Cart] Update Quantity',
    props<{ id: string; quantity: number }>()
);

export const toggleSelection = createAction(
    '[Cart] Toggle Selection',
    props<{ id: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');