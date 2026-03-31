import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import OrderStatus from './components/orderStatus';
import { Separator } from '@/components/ui/separator';
import { Banknote, Coins, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SingleOrder = () => {
    return (
        <div className="container mt-6 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order</CardTitle>
                    <CardDescription>Track the order status. </CardDescription>
                </CardHeader>
                <CardContent>
                    <OrderStatus />
                </CardContent>
            </Card>

            <div className="flex gap-6">
                <Card className="w-1/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start text-lg justify-between gap-12">
                            Delivery Address
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <h2 className="font-bold">Aniket D</h2>
                        <p className="mt-2">55, New Street, upper lane, New Delhi. India. 409876</p>
                    </CardContent>
                </Card>

                <Card className="w-2/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start text-lg justify-between gap-12">
                            Your order information
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard size={20} />
                            <h2 className="text-base font-medium">Order reference: </h2>
                            ord121313123131313
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Banknote />
                            <h2 className="text-base font-medium">Payment status: </h2>
                            <span>Paid</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Coins size={20} />
                            <h2 className="text-base font-medium">Payment method: </h2>
                            <span>Card</span>
                        </div>

                        <Button variant={'destructive'} className="mt-6">
                            Cancel Order
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SingleOrder;