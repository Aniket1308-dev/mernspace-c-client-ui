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
import Link from 'next/link';
import React from 'react';

const Orders = async () => {
    return (
        <div className="container mt-8">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>My complete order history.</CardDescription>
                </CardHeader>
                <CardContent>
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
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant={'outline'}>Completed</Badge>
                                </TableCell>
                                <TableCell>$250.00</TableCell>
                                <TableCell className="text-right">
                                    <Link href="/order/1223" className="underline text-primary">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant={'outline'}>Completed</Badge>
                                </TableCell>
                                <TableCell>$250.00</TableCell>
                                <TableCell className="text-right">
                                    <Link href="/order/1223" className="underline text-primary">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant={'outline'}>Completed</Badge>
                                </TableCell>
                                <TableCell>$250.00</TableCell>
                                <TableCell className="text-right">
                                    <Link href="/order/1223" className="underline text-primary">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell>22.05.24 13:22</TableCell>
                                <TableCell>
                                    <Badge variant={'outline'}>Completed</Badge>
                                </TableCell>
                                <TableCell>$250.00</TableCell>
                                <TableCell className="text-right">
                                    <Link href="/order/1223" className="underline text-primary">
                                        More details
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Orders;