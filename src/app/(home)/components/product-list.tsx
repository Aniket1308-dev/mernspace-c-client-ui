import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';
import ProductCard from './product-card';
import { Category, Product } from '@/lib/types';

const ProductList = async ({ searchParams }: { searchParams: { restaurantId: string } }) => {
    console.log('searchParams', searchParams.restaurantId);
    // todo: do concurrent requests -> Promise.all()
let categories: Category[] = [];
let products: Product[] = [];

try {
    const [categoryResponse, productsResponse] = await Promise.all([
        fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
            next: { revalidate: 3600 },
        }),
        fetch(
            `${process.env.BACKEND_URL}/api/catalog/products?perPage=100&limit=100&tenantId=${searchParams.restaurantId}`,
            { next: { revalidate: 3600 } }
        ),
    ]);

    if (categoryResponse.ok) {
        categories = await categoryResponse.json();
    }

    if (productsResponse.ok) {
        const productsData: { data: Product[] } = await productsResponse.json();
        products = productsData.data;
    }
} catch (error) {
    console.error('Backend unavailable:', error);
}

if (categories.length === 0) {
    return (
        <section>
            <div className="container py-12 text-center text-gray-400 text-lg">
                Menu is currently unavailable. Please check back later.
            </div>
        </section>
    );
}

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
                            {products
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