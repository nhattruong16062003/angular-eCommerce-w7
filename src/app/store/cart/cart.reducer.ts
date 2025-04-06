import { createReducer, on } from '@ngrx/store';
import { cartAdapter, initialState } from './cart.state';
import * as CartActions from './cart.actions';

export const cartReducer = createReducer(
    initialState,
    on(CartActions.addToCart, (state, { product }) => {
        const existingItem = state.entities[product.id];
        return cartAdapter.upsertOne(
            {
                id: product.id,
                product,
                quantity: existingItem ? existingItem.quantity + 1 : 1,
                selected: true
            },
            state
        );
    }),
    on(CartActions.removeFromCart, (state, { id }) => {
        return cartAdapter.removeOne(id, state);
    }),
    on(CartActions.updateQuantity, (state, { id, quantity }) => {
        if (quantity <= 0) {
            return cartAdapter.removeOne(id, state);
        }
        return cartAdapter.updateOne(
            {
                id,
                changes: { quantity }
            },
            state
        );
    }),
    on(CartActions.toggleSelection, (state, { id }) => {
        const item = state.entities[id];
        if (!item) return state;

        return cartAdapter.updateOne(
            {
                id,
                changes: { selected: !item.selected }
            },
            state
        );
    }),
    on(CartActions.clearCart, (state) => {
        return cartAdapter.removeAll(state);
    })
);