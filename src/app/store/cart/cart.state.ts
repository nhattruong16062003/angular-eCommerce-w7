import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../../models/product.model';

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
    selected: boolean;
}

export interface CartState extends EntityState<CartItem> {
    // Có thể thêm các thuộc tính bổ sung nếu cần
}

export const cartAdapter = createEntityAdapter<CartItem>({
    selectId: (item: CartItem) => item.id
});

export const initialState: CartState = cartAdapter.getInitialState();