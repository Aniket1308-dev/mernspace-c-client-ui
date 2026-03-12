import { type ClassValue, clsx } from 'clsx';
import CryptoJs from 'crypto-js';
import { twMerge } from 'tailwind-merge';
import { CartItem } from './store/features/cart/cartSlice';
import { Product } from './types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hashTheItem(payload: CartItem): string {
    const jsonString = JSON.stringify({ ...payload, qty: undefined });

    const hash = CryptoJs.SHA256(jsonString).toString();

    return hash;
}


export function getFromPrice(product: Product): number {
    const basePrice = Object.entries(product.priceConfiguration)
        .filter(([key, value]) => {
            return value.priceType === 'base';
        })
        .reduce((acc, [key, value]) => {
            const smallestPrice = Math.min(...Object.values(value.availableOptions));
            return acc + smallestPrice;
        }, 0);
    return basePrice;
}

export function getItemTotal(product: CartItem) {
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
}