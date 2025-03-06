import React from 'react';
import { ProductCard } from '@/app/components/products/ProductCard';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Quantum VR Headset',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop',
    slug: 'quantum-vr-headset',
    category: 'VR',
  },
  {
    id: '2',
    name: 'NeoTech Gaming Console',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop',
    slug: 'neotech-gaming-console',
    category: 'Gaming',
  },
  {
    id: '3',
    name: 'Pixel Ultra Smartphone',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop',
    slug: 'pixel-ultra-smartphone',
    category: 'Smartphones',
  },
  {
    id: '4',
    name: 'Quantum Wireless Earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop',
    slug: 'quantum-wireless-earbuds',
    category: 'Audio',
  },
  {
    id: '5',
    name: 'Nebula Smart Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
    slug: 'nebula-smart-watch',
    category: 'Wearables',
  },
  {
    id: '6',
    name: 'Fusion Gaming Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop',
    slug: 'fusion-gaming-laptop',
    category: 'Laptops',
  },
];

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop Our Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 