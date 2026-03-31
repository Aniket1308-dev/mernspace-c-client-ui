import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Order, OrderData } from '@/lib/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const Orders = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/order/orders/mine`, {
        headers: {
            Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error Fetching my order.');
    }

    const orders = (await response.json()) || [];
    return (
        <div className="container mt-8">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>My complete order history.</CardDescription>
                </CardHeader>
                <CardContent>
                    {orders.length === 0 ? (
                        'No orders yet.'
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Payment Status</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Date Time</TableHead>
                                    <TableHead>Order Status</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order: Order) => {
                                    return (
                                        <TableRow key={order._id}>
                                            <TableCell className="font-medium">
                                                {order._id}
                                            </TableCell>
                                            <TableCell>
                                                {order.paymentStatus.toUpperCase()}
                                            </TableCell>
                                            <TableCell>{order.paymentMode}</TableCell>
                                            <TableCell>{order.createdAt}</TableCell>
                                            <TableCell>
                                                <Badge variant={'outline'}>
                                                    {order.orderStatus.toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            {/* todo: make sure the total is grand total */}
                                            <TableCell>₹{order.total}</TableCell>
                                            <TableCell className="text-right">
                                                <Link
                                                    href={`/order/${order._id}`}
                                                    className="underline text-primary">
                                                    More details
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Orders;