import React from 'react';
import Image from 'next/image';
import QtyChanger from './qtyChanger';
import { CartItem as Item } from '@/lib/store/features/cart/cartSlice';
import { X } from 'lucide-react';

const CartItem = ({ item }: { item: Item }) => {
    return (
        <>
            <div className="grid grid-cols-2">
                <div className="flex items-center w-3/4">
                    <Image src={item.image} width={100} height={100} alt={item.name} />
                    <div className="flex gap-12 ml-6 w-full">
                        <div className="flex-1">
                            <h2 className="font-bold">{item.name}</h2>
                            <h3 className="text-xs text-gray-500">
                                {Object.values(item.chosenConfiguration.priceConfiguration)
                                    .map((value) => value)
                                    .join(', ')}
                            </h3>
                            <h3 className="text-xs text-gray-500">
                                {item.chosenConfiguration.selectedToppings
                                    .map((topping) => topping.name)
                                    .join(', ')}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 justify-between">
                    <div>
                        <QtyChanger handleQtyChange={() => {}}>{item.qty}</QtyChanger>
                    </div>
                    <div className="flex">
                        <div className="font-bold w-12">&#8377;300</div>
                        <button className="ml-4" onClick={() => {}}>
                            <X />
                        </button>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
};

export default CartItem;