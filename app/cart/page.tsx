'use client';

import { useCart } from '@/contexts/cart-context';
import { CartItem } from '@/components/cart-item';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_YOUR_KEY_HERE';
const WHATSAPP_NUMBER = '2349064515891';

export default function CartPage() {
    const { items, total, clearCart } = useCart();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [PaystackHook, setPaystackHook] = useState<any>(null);

    // Load Paystack hook only on client side
    useEffect(() => {
        import('react-paystack').then((mod) => {
            setPaystackHook(() => mod.usePaystackPayment);
        });
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatOrderForWhatsApp = () => {
        const orderDetails = items
            .map(
                (item) =>
                    `• ${item.product.name} (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`
            )
            .join('%0A');

        return `Hello! I just completed payment for my order:%0A%0A${orderDetails}%0A%0ATotal: ${formatPrice(total)}%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}`;
    };

    const config = {
        reference: new Date().getTime().toString(),
        email: email || 'customer@example.com',
        amount: total * 100,
        publicKey: PAYSTACK_PUBLIC_KEY,
        metadata: {
            custom_fields: [
                {
                    display_name: 'Customer Name',
                    variable_name: 'customer_name',
                    value: name,
                },
                {
                    display_name: 'Phone Number',
                    variable_name: 'phone_number',
                    value: phone,
                },
            ],
        },
    };

    const onSuccess = (reference: any) => {
        console.log('Payment successful:', reference);
        const whatsappMessage = formatOrderForWhatsApp();
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
        clearCart();
        if (typeof window !== 'undefined') {
            window.location.href = whatsappUrl;
        }
    };

    const onClose = () => {
        console.log('Payment closed');
    };

    const initializePayment = PaystackHook ? PaystackHook(config) : null;

    const handleCheckout = () => {
        if (!email || !name || !phone) {
            alert('Please fill in all your details before proceeding to checkout.');
            return;
        }
        if (items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        if (initializePayment) {
            initializePayment({ onSuccess, onClose });
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center py-20 px-4">
                    <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
                    <h2 className="font-serif text-3xl mb-4">Your Cart is Empty</h2>
                    <p className="text-muted-foreground mb-8">
                        Discover our luxury collection and add items to your cart
                    </p>
                    <Link href="/shop">
                        <Button className="bg-gold hover:bg-gold-dark text-charcoal">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <section className="bg-charcoal text-cream py-12 lg:py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <Link
                        href="/shop"
                        className="inline-flex items-center text-gold hover:text-gold-light mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Link>
                    <h1 className="font-serif text-4xl md:text-5xl">Shopping Cart</h1>
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-card rounded-lg p-6">
                                <h2 className="font-serif text-2xl mb-6">Cart Items ({items.length})</h2>
                                <div className="divide-y divide-border">
                                    {items.map((item) => (
                                        <CartItem key={item.product.id} item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-card rounded-lg p-6 sticky top-24">
                                <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                                            placeholder="+234 XXX XXX XXXX"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-border pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">{formatPrice(total)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">Calculated at checkout</span>
                                    </div>
                                    <div className="border-t border-border pt-3 flex justify-between">
                                        <span className="font-serif text-lg">Total</span>
                                        <span className="font-serif text-2xl text-gold">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="w-full mt-6 bg-gold hover:bg-gold-dark text-charcoal py-6 text-lg font-medium"
                                    size="lg"
                                >
                                    Proceed to Payment
                                </Button>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Secure payment powered by Paystack. After payment, you'll be redirected to WhatsApp to confirm your order.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
