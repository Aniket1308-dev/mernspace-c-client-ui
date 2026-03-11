'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CartCounter = () => {
    const cartItems = useAppSelector((state) => state.cart.cartItems);

    return (
        <>
            <div className="relative">
                <Link href="/cart">
                    <ShoppingBasket className="hover:text-primary" />
                </Link>
                <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
                    {cartItems.length}
                </span>
            </div>
        </>
    );
};

export default CartCounter;