'use client';

import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const itemTotal = item.product.price * item.quantity;

    return (
        <div className="flex gap-4 py-6 border-b border-border">
            {/* Product Image */}
            <div className="w-24 h-32 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-serif text-lg text-foreground mb-1">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span className="mx-2">•</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    </p>
                    <p className="text-gold font-semibold">{formatPrice(item.product.price)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                        >
                            <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <p className="font-semibold text-lg">{formatPrice(itemTotal)}</p>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
