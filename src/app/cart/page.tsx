import React from 'react';
import CartItems from './cartItems/cartItems';

const CartPage = () => {
    return (
        <section>
            <div className="container mx-auto py-6">
                <h1 className="text-lg font-bold">Shopping cart</h1>
                <div className="bg-white rounded-lg p-6 mt-6">
                    <CartItems />
                </div>
            </div>
        </section>
    );
};

export default CartPage;