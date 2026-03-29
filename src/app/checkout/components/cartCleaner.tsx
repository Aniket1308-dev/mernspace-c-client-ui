'use client';
import { clearCart } from '@/lib/store/features/cart/cartSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import React from 'react';

const CartCleaner = () => {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(clearCart());
    }, []);
    return null;
};

export default CartCleaner;