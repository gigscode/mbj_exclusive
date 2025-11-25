'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product, 1, product.sizes[0], product.colors[0]);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div
            className="group relative overflow-hidden bg-card rounded-lg transition-all duration-300 hover:shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className={cn(
                        'w-full h-full object-cover transition-transform duration-500',
                        isHovered && 'scale-110'
                    )}
                />

                {/* Overlay on Hover */}
                <div
                    className={cn(
                        'absolute inset-0 bg-charcoal/60 transition-opacity duration-300 flex items-center justify-center gap-3',
                        isHovered ? 'opacity-100' : 'opacity-0'
                    )}
                >
                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        className={cn(
                            'bg-gold hover:bg-gold-dark text-charcoal transition-all duration-300',
                            isAdded && 'bg-green-600 hover:bg-green-700'
                        )}
                    >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {isAdded ? 'Added!' : 'Add to Cart'}
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-charcoal"
                    >
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>

                {/* Stock Badge */}
                {!product.inStock && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                        Out of Stock
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {product.category}
                </p>
                <h3 className="font-serif text-lg mb-2 text-foreground group-hover:text-gold transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold text-gold">{formatPrice(product.price)}</p>
                    <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                            <div
                                key={index}
                                className="w-4 h-4 rounded-full border border-border"
                                style={{
                                    backgroundColor: color.toLowerCase() === 'multi' ? 'linear-gradient(45deg, red, blue, green)' : color.toLowerCase(),
                                }}
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
