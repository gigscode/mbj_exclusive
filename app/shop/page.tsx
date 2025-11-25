'use client';

import { useState } from 'react';
import { products, categories } from '@/lib/products-data';
import { Category, SortOption } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [showFilters, setShowFilters] = useState(false);

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
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-background">
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
                                    {category.name} ({category.count})
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
                        Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                    </p>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {sortedProducts.length === 0 && (
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
