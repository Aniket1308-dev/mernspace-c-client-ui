import React from 'react';
import { CartItem } from '../store/features/cart/cartSlice';

export function useTotal(product: CartItem) {
    const totalPrice = React.useMemo(() => {
        const toppingsTotal = product.chosenConfiguration.selectedToppings.reduce(
            (acc, curr) => acc + curr.price,
            0
        );

        const configPricing = Object.entries(product.chosenConfiguration.priceConfiguration).reduce(
            (acc, [key, value]: [string, string]) => {
                const price = product.priceConfiguration[key].availableOptions[value];
                return acc + price;
            },
            0
        );
        return configPricing + toppingsTotal;
    }, [product]);
    return totalPrice;
}