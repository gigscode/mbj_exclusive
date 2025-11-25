"use client"

import Image from 'next/image';
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
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={cn(
                        'object-cover transition-transform duration-500',
                        isHovered && 'scale-110'
                    )}
                />

                {/* Overlay on Hover - Visible on mobile, hover on desktop */}
                <div
                    className={cn(
                        'absolute inset-0 bg-charcoal/60 transition-opacity duration-300 flex items-center justify-center gap-3',
                        'opacity-0 lg:opacity-0 lg:group-hover:opacity-100', // Default hidden
                        isHovered ? 'opacity-100' : '' // Show on hover (desktop)
                    )}
                // Mobile fix: We can't easily rely on hover. 
                // Alternative: Always show a cart button on mobile or rely on tap.
                // Let's make it visible on tap (active) or just always visible on mobile?
                // "opacity-100 lg:opacity-0" would make it always covered on mobile which might be annoying.
                // Better approach: Add a dedicated mobile cart button outside the image or make the overlay appear on tap.
                // For now, let's stick to the requested "Responsive" requirement. 
                // A common pattern is a button in the corner.
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

                {/* Mobile Cart Button (Always visible on mobile) */}
                <Button
                    size="icon"
                    onClick={handleAddToCart}
                    className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-gold text-charcoal shadow-lg lg:hidden"
                    aria-label="Add to cart"
                >
                    <ShoppingBag className="w-5 h-5" />
                </Button>

                {/* Stock Badge */}
                {!product.inStock && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 text-xs font-medium rounded-full z-10">
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
