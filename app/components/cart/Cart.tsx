"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, ChevronRight, Shield, Zap } from 'lucide-react';
import { useCartStore } from '@/app/store/cart';
import { CartItem } from './CartItem';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showQuantumEffect, setShowQuantumEffect] = useState(false);

  // Simulate quantum encryption effect
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowQuantumEffect(true);
        setTimeout(() => setShowQuantumEffect(false), 2000);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCheckout = () => {
    setCheckoutLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setCheckoutLoading(false);
      clearCart();
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} 
          />
          
          <motion.div 
            className="absolute inset-y-0 right-0 flex max-w-full"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl relative">
                {/* Quantum encryption effect */}
                {showQuantumEffect && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 animate-hologram"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-blue-500 font-mono text-sm flex flex-col items-center"
                      >
                        <Shield className="h-8 w-8 mb-2 animate-pulse" />
                        <div className="text-center">
                          <div>QUANTUM ENCRYPTION</div>
                          <div className="text-xs opacity-70">SECURE TRANSACTION PROTOCOL</div>
                        </div>
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10 mix-blend-overlay"></div>
                  </div>
                )}
                
                <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200 dark:border-gray-700 relative">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Quantum Cart <span className="ml-2 text-sm opacity-70">({getTotalItems()})</span>
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close cart"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>
                
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center flex-1 px-4 py-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative"
                    >
                      <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-500/20 animate-pulse-glow"></div>
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-500 dark:text-gray-400 text-lg"
                    >
                      Your quantum storage is empty
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={onClose}
                      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity"></span>
                      <span className="relative z-10 flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        Explore Products
                      </span>
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="space-y-4">
                        {items.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CartItem item={item} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-100">
                        <p>Subtotal</p>
                        <div className="flex items-center">
                          <motion.span
                            key={getTotalPrice()} // Re-animate when price changes
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-mono"
                          >
                            ${getTotalPrice().toFixed(2)}
                          </motion.span>
                          <span className="ml-1 text-xs text-blue-500">Ξ</span>
                        </div>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        Quantum shipping calculated at checkout.
                      </p>
                      
                      <div className="mt-6 space-y-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCheckout}
                          disabled={checkoutLoading}
                          className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors relative overflow-hidden"
                        >
                          {/* Futuristic background effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                          <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-10 mix-blend-overlay"></div>
                          
                          {checkoutLoading ? (
                            <div className="relative z-10 flex items-center">
                              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              <span>Processing...</span>
                            </div>
                          ) : (
                            <div className="relative z-10 flex items-center">
                              <span>Quantum Checkout</span>
                              <ChevronRight className="h-5 w-5 ml-2" />
                            </div>
                          )}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={clearCart}
                          className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Trash2 className="h-5 w-5 mr-2" />
                          Clear Quantum Storage
                        </motion.button>
                      </div>
                      
                      {/* Security badge */}
                      <div className="mt-6 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                        <Shield className="h-4 w-4 mr-1 text-green-500" />
                        <span>Secured by Quantum Encryption</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 