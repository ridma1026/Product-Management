import { Product } from './types';

const KEY = 'product_studio_v1';

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 129.99, description: 'High-quality wireless headphones with noise cancellation.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', status: 'in-stock', category: 'Electronics' },
  { id: 2, name: 'Desk Plant', price: 24.99, description: 'Bring life to your workspace with this low-maintenance succulent.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80', status: 'in-stock', category: 'Home' },
  { id: 3, name: 'Smart Watch', price: 299.99, description: 'Track your health and stay connected on the go.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', status: 'low-stock', category: 'Electronics' },
  { id: 4, name: 'Sony A7 III Camera', price: 1199.99, description: 'Full-frame mirrorless camera for professionals.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80', status: 'in-stock', category: 'Electronics' },
];

export const getProducts = (): Product[] => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(SAMPLE_PRODUCTS));
    return SAMPLE_PRODUCTS;
  }
  return JSON.parse(raw);
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(KEY, JSON.stringify(products));
};