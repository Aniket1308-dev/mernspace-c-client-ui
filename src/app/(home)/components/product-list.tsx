import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import ProductCard from './product-card';
import { Category, Product } from '@/lib/types';

const ProductList = async ({ searchParams }: { searchParams: { restaurantId: string } }) => {
    console.log('searchParams', searchParams.restaurantId);
    // todo: do concurrent requests -> Promise.all()
    const categoryResponse = await fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
        next: {
            revalidate: 3600, // 1 hour
        },
    });

    if (!categoryResponse.ok) {
        throw new Error('Failed to fetch categories');
    }

    const categories: Category[] = await categoryResponse.json();

    // todo: add pagination
    const productsResponse = await fetch(
        `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&tenantId=${searchParams.restaurantId}`,
        {
            next: {
                revalidate: 3600, // 1 hour
            },
        }
    );

    const products: { data: Product[] } = await productsResponse.json();
    return (
        <section>
            <div className="container py-12">
                <Tabs defaultValue={categories[0]._id}>
                    <TabsList>
                        {categories.map((category) => {
                            return (
                                <TabsTrigger
                                    key={category._id}
                                    value={category._id}
                                    className="text-md">
                                    {category.name}
                                </TabsTrigger>
                            );
                        })}
                        {/* <TabsTrigger value="beverages" className="text-md">
                    Beverages
                </TabsTrigger> */}
                    </TabsList>
                    {categories.map((category) => {
                        return (
                            <TabsContent key={category._id} value={category._id}>
                                <div className="grid grid-cols-4 gap-6 mt-6">
                                    {products.data
                                        .filter((product) => product.category._id === category._id)
                                        .map((product) => (
                                            <ProductCard product={product} key={product._id} />
                                        ))}
                                </div>
                            </TabsContent>
                        );
                    })}

                    {/* <TabsContent value="beverages">
                <div className="grid grid-cols-4 gap-6 mt-6">
                    {products.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </TabsContent> */}
                </Tabs>
            </div>
        </section>
    );
};

export default ProductList;