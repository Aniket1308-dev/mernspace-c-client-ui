'use client';
import React from 'react';
import { z } from 'zod';
import { Coins, CreditCard, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { getCustomer } from '@/lib/http/api';
import { Customer } from '@/lib/types';
import AddAdress from './addAddress';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
    address: z.string({ required_error: 'Please select an address.' }),
    paymentMode: z.enum(['card', 'cash'], {
        required_error: 'You need to select a payment mode type.',
    }),
    comment: z.any(),
});


const CustomerForm = () => {
    const customerForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { data: customer, isLoading } = useQuery<Customer>({
        queryKey: ['customer'],
        queryFn: async () => {
            return await getCustomer().then((res) => res.data);
        },
    });

    if (isLoading) {
        // todo: use Spinner/Loader or Shadcn Skeleton
        return <h3>Loading...</h3>;
    }

    const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
        // handle place order call.
        console.log('data', data);
    };


    return (
        <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
                <div className="flex container gap-6 mt-16">
                    <Card className="w-3/5 border-none">
                        <CardHeader>
                            <CardTitle>Customer details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input
                                        id="fname"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer?.firstName}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input
                                        id="lname"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer?.lastName}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="text"
                                        className="w-full"
                                        defaultValue={customer?.email}
                                        disabled
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="name">Address</Label>
                                            <AddAdress customerId={customer?._id} />
                                        </div>
                                        <FormField
                                            name="address"
                                            control={customerForm.control}
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                className="grid grid-cols-2 gap-6 mt-2">
                                                                {customer?.addresses.map(
                                                                    (address) => {
                                                                        return (
                                                                            <Card
                                                                                className="p-6"
                                                                                key={address.text}>
                                                                                <div className="flex items-center space-x-2">
                                                                                    <FormControl>
                                                                                        <RadioGroupItem
                                                                                            value={
                                                                                                address.text
                                                                                            }
                                                                                            id={
                                                                                                address.text
                                                                                            }
                                                                                        />
                                                                                    </FormControl>
                                                                                    <Label
                                                                                        htmlFor={
                                                                                            address.text
                                                                                        }
                                                                                        className="leading-normal">
                                                                                        {
                                                                                            address.text
                                                                                        }
                                                                                    </Label>
                                                                                </div>
                                                                            </Card>
                                                                        );
                                                                    }
                                                                )}
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-3">
                                    <Label>Payment Mode</Label>
                                    <FormField
                                        name="paymentMode"
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            className="flex gap-6">
                                                            <div className="w-36">
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={'card'}
                                                                        id={'card'}
                                                                        className="peer sr-only"
                                                                        aria-label={'card'}
                                                                    />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={'card'}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <CreditCard size={'20'} />
                                                                    <span className="ml-2">
                                                                        Card
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                            <div className="w-36">
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={'cash'}
                                                                        id={'cash'}
                                                                        className="peer sr-only"
                                                                        aria-label={'cash'}
                                                                    />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={'cash'}
                                                                    className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                                    <Coins size={'20'} />
                                                                    <span className="ml-2 text-md">
                                                                        Cash
                                                                    </span>
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="fname">Comment</Label>
                                    <FormField
                                        name="comment"
                                        control={customerForm.control}
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            );
                                        }}
                                    />

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="w-2/5 border-none h-auto self-start">
                        <CardHeader>
                            <CardTitle>Order summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 pt-6">
                            <div className="flex items-center justify-between">
                                <span>Subtotal</span>
                                <span className="font-bold">₹8130</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Taxes</span>
                                <span className="font-bold">₹82</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Delivery charges</span>
                                <span className="font-bold">₹100</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Discount</span>
                                <span className="font-bold">₹0</span>
                            </div>
                            <hr />
                            <div className="flex items-center justify-between">
                                <span className="font-bold">Order total</span>
                                <span className="font-bold">₹8300</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Input
                                    id="fname"
                                    type="text"
                                    className="w-full"
                                    placeholder="Coupon code"
                                />
                                <Button variant={'outline'}>Apply</Button>
                            </div>
                            <div className="text-right mt-6">
                                <Button>Place order</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </Form>
    );
};

export default CustomerForm;