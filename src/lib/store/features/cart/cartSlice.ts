import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
    value: number;
}

const initialState: CartState = {
    value: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment } = cartSlice.actions;

export default cartSlice.reducer;