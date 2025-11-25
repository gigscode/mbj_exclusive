'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/lib/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Set mounted state on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Load cart from localStorage on mount (client-side only)
    useEffect(() => {
        if (!isMounted) return;

        const savedCart = localStorage.getItem('mbj-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        }
        setIsLoaded(true);
    }, [isMounted]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded && isMounted) {
            localStorage.setItem('mbj-cart', JSON.stringify(items));
        }
    }, [items, isLoaded, isMounted]);

    const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) =>
                    item.product.id === product.id &&
                    item.selectedSize === size &&
                    item.selectedColor === color
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id &&
                        item.selectedSize === size &&
                        item.selectedColor === color
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...currentItems, { product, quantity, selectedSize: size, selectedColor: color }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total,
                itemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
