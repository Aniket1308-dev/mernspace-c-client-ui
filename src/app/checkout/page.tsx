export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { getSession } from '@/lib/session';
import { Coins, CreditCard, Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import CustomerForm from './components/customerForm';


export default async function Checkout({
    searchParams,
}: {
    searchParams: { restaurantId: string };
}) {
    // const session = await getSession();

    const sParams = new URLSearchParams(searchParams);
    const existingQueryString = sParams.toString();

    sParams.append('return-to', `/checkout?${existingQueryString}`);

    // /login?return-to=/checkout?existingQueryString

    // if (!session) {
    //     redirect(`/login?${sParams}`);
    // }

    return <CustomerForm />;
}