'use client';

import { useState, useEffect } from 'react';
import { categories } from '@/lib/products-data';
import { Category, SortOption, Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/header';
import { supabase } from '@/lib/supabase';

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [sortBy, setSortBy] = useState<SortOption>('newest');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (error) {
                console.error('Error fetching products:', error);
                return;
            }

            if (data) {
                // Map Supabase data to Product type
                const mappedProducts: Product[] = (data as any[]).map((item) => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: Number(item.price),
                    category: item.category,
                    images: item.images || [],
                    sizes: item.sizes || [],
                    colors: item.colors || [],
                    inStock: item.in_stock,
                    is_featured: item.is_featured,
                }));
                setProducts(mappedProducts);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter products
    const filteredProducts = products.filter((product) => {
        if (selectedCategory === 'all') return true;
        return product.category === selectedCategory;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'newest':
            default:
                // If we had a created_at field we could sort by that, 
                // for now we'll just use the order they came in (which is usually insertion order or ID)
                // or we can add created_at to the type if needed.
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-background">
            <Header />
            {/* Hero Section */}
            <section className="relative bg-charcoal text-cream py-20 lg:py-28">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <span className="text-gold text-sm tracking-[0.3em] uppercase font-medium">
                        Luxury Collection
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 mb-6">
                        Shop MBJ EXCLUSIVE
                    </h1>
                    <p className="text-cream/80 text-lg max-w-2xl mx-auto">
                        Discover handcrafted couture pieces that celebrate Nigerian luxury fashion
                    </p>
                </div>
            </section>

            {/* Filters and Products */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                                    onClick={() => setSelectedCategory(category.id as Category)}
                                    className={
                                        selectedCategory === category.id
                                            ? 'bg-gold hover:bg-gold-dark text-charcoal'
                                            : 'border-border hover:border-gold'
                                    }
                                >
                                    {category.name}
                                    {/* We can't easily show count here without pre-calculating or fetching counts */}
                                </Button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Sort by:</span>
                            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <p className="text-sm text-muted-foreground mb-6">
                        {loading ? 'Loading products...' : `Showing ${sortedProducts.length} ${sortedProducts.length === 1 ? 'product' : 'products'}`}
                    </p>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                            {sortedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && sortedProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No products found in this category.</p>
                            <Button
                                onClick={() => setSelectedCategory('all')}
                                className="mt-6 bg-gold hover:bg-gold-dark text-charcoal"
                            >
                                View All Products
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
