export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: 'dresses' | 'gowns' | 'separates' | 'bridal';
    images: string[];
    sizes: string[];
    colors: string[];
    inStock: boolean;
}

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export type Category = 'all' | 'dresses' | 'gowns' | 'separates' | 'bridal';

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest';
