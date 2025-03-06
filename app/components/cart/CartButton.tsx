"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import { useCartStore } from '@/app/store/cart';
import { Cart } from './Cart';

export function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const { getTotalItems } = useCartStore();
  
  // Pulse effect when cart items change
  useEffect(() => {
    if (getTotalItems() > 0) {
      setPulseEffect(true);
      const timer = setTimeout(() => {
        setPulseEffect(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [getTotalItems()]);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <motion.button
        onClick={toggleCart}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
        aria-label="Open cart"
      >
        {/* Quantum energy field */}
        <AnimatePresence>
          {isHovering && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-500/10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.6 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        
        {/* Pulse effect when items added */}
        <AnimatePresence>
          {pulseEffect && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-blue-500/20"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
        
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          
          {/* Quantum energy spark */}
          {isHovering && (
            <motion.div 
              className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {getTotalItems() > 0 && (
            <motion.div 
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-medium text-white overflow-hidden"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
            >
              {/* Background circuit pattern */}
              <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-20 mix-blend-overlay"></div>
              
              {/* Quantum energy effect */}
              <motion.div 
                className="absolute inset-0 bg-blue-400/30"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <span className="relative z-10 flex items-center">
                {getTotalItems() < 10 ? (
                  getTotalItems()
                ) : (
                  <>
                    <Zap className="h-2 w-2 mr-0.5" />
                    {getTotalItems()}
                  </>
                )}
              </span>
            </motion.div>
          )}
        </div>
      </motion.button>
      
      <Cart isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
} 