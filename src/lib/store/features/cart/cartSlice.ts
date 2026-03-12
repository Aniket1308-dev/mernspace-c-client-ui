import { Product, Topping } from '@/lib/types';
import { hashTheItem } from '@/lib/utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem extends Pick<Product, '_id' | 'name' | 'image' | 'priceConfiguration'> {
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    qty: number;
    hash?: string;
}
export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const hash = hashTheItem(action.payload);
            const newItem = {
                ...action.payload,
                hash: hash,
                // product: action.payload.product,
                // chosenConfiguration: action.payload.chosenConfiguration,
            };

            window.localStorage.setItem('cartItems', JSON.stringify([...state.cartItems, newItem]));


            return {
                cartItems: [...state.cartItems, newItem],
            };
        },
        setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems.push(...action.payload);
        },

    },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems } = cartSlice.actions;

export default cartSlice.reducer;