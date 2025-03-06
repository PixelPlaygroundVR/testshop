"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Zap, BarChart3 } from 'lucide-react';
import { useCartStore, CartItem } from '@/app/store/cart';
import { CartPortal } from '@/app/components/cart/CartPortal';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
    category: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [portalPosition, setPortalPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    
    addItem(cartItem);
    
    // Set portal position to the button's position
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPortalPosition({ 
        x: rect.left + rect.width / 2, 
        y: rect.top + rect.height / 2 
      });
    }
    
    setShowPortal(true);
    setTimeout(() => setShowPortal(false), 1500);
  };

  // Random tech specs for sci-fi effect
  const techSpecs = [
    { label: "QPS", value: Math.floor(Math.random() * 100) + 20 },
    { label: "NRG", value: Math.floor(Math.random() * 50) + 10 },
  ];

  return (
    <>
      <motion.div 
        className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm transition-all hover:shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          <Link href={`/products/${product.slug}`}>
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Holographic overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                animate={{ 
                  background: isHovered 
                    ? "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))" 
                    : "linear-gradient(to right, rgba(59, 130, 246, 0), rgba(168, 85, 247, 0))" 
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Tech scan lines */}
              <div className="absolute inset-0 bg-[url('/scan-lines.png')] opacity-0 group-hover:opacity-20 mix-blend-overlay"></div>
            </div>
          </Link>
          
          {/* Tech specs overlay */}
          <motion.div 
            className="absolute top-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="flex justify-between items-center">
              {techSpecs.map((spec, index) => (
                <div key={index} className="bg-black/60 backdrop-blur-sm text-xs rounded px-2 py-1 text-blue-400 font-mono flex items-center">
                  <span className="mr-1">{spec.label}:</span>
                  <span className="text-green-400 animate-quantum-flicker">{spec.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 backdrop-blur-sm transition-colors hover:bg-white dark:hover:bg-gray-900"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-1">
            <span className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center">
              <Zap className="h-3 w-3 mr-1 animate-pulse" />
              {product.category}
            </span>
          </div>
          
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center mt-1">
                <BarChart3 className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-500">Quantum verified</span>
              </div>
            </div>
            
            <motion.button
              ref={buttonRef}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors relative overflow-hidden group"
              aria-label="Add to cart"
            >
              {/* Pulsing background effect */}
              <span className="absolute inset-0 bg-blue-400 opacity-0 group-hover:animate-pulse-glow"></span>
              <ShoppingCart className="h-4 w-4 relative z-10" />
            </motion.button>
          </div>
        </div>
        
        {/* Holographic corner effect */}
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </motion.div>
      
      <CartPortal 
        isActive={showPortal} 
        productId={product.id} 
        startPosition={portalPosition} 
      />
    </>
  );
} 