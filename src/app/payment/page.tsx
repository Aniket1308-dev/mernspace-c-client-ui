import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle2, CircleX, LayoutDashboard, Store } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CartCleaner from '../checkout/components/cartCleaner';

const Payment = ({
    searchParams,
}: {
    searchParams: { success: string; orderId: string; restaurantId: string };
}) => {

    const isOrderSuccess = searchParams.success === 'true';
    return (
        <>
            {isOrderSuccess && <CartCleaner />}
            <div className="flex flex-col items-center gap-4 w-full mt-32">
                {isOrderSuccess ? (
                    <>
                        <CheckCircle2 size={80} className="text-green-500" />
                        <h1 className="text-2xl font-bold mt-2 text-center">
                            Order placed successfully.
                        </h1>
                        <p className="text-base font-semibold -mt-2">Thank you for your order.</p>
                    </>
                ) : (
                    <>
                        <CircleX size={80} className="text-red-500" />
                        <h1 className="text-2xl font-bold mt-2 text-center">
                            Payment has been failed.
                        </h1>
                        <p className="text-base font-semibold -mt-2">Please try again.</p>
                    </>
                )}

                {isOrderSuccess && (
                    <Card className="mt-6">
                        <CardHeader className="p-4">
                            <CardTitle className="flex items-start text-lg justify-between gap-12">
                                <div className="flex item-center gap-3">
                                    <Store size={35} className="text-primary" />
                                    <span>Your order information</span>
                                </div>
                                <Badge className="text-base px-4" variant={'secondary'}>
                                    Confirmed
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2">
                                <LayoutDashboard size={20} />
                                <h2 className="text-base font-medium">Order reference: </h2>
                                <Link href={`/order/${searchParams.orderId}`} className="underline">
                                    {searchParams.orderId}
                                </Link>
                            </div>


                            <div className="flex items-center gap-2 mt-2">
                                <LayoutDashboard size={20} />
                                <h2 className="text-base font-medium">Payment status: </h2>
                                <span>Paid</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {isOrderSuccess ? (
                    <Button asChild className="mt-6">
                        <Link
                            href={`/order/${searchParams.orderId}?restaurantId=${searchParams.restaurantId}`}
                            className="flex items-center gap-2">
                            <ArrowLeft size={20} className="text-white" />
                            <span>Go to order status page</span>
                        </Link>
                    </Button>
                ) : (
                    <Button asChild className="mt-6">
                        <Link
                            href={`/checkout?restaurantId=${searchParams.restaurantId}`}
                            className="flex items-center gap-2">
                            <ArrowLeft size={20} className="text-white" />
                            <span>Go to checkout</span>
                        </Link>
                    </Button>
                )}
            </div>
        </>
    );
};

export default Payment;