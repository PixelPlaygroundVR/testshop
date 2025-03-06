"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/app/store/cart';

interface CartPortalProps {
  isActive: boolean;
  productId: string;
  startPosition: { x: number; y: number };
}

export function CartPortal({ isActive, productId, startPosition }: CartPortalProps) {
  const [visible, setVisible] = useState(false);
  const { items } = useCartStore();
  
  useEffect(() => {
    if (isActive) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  
  if (!visible) return null;
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-50 pointer-events-none"
          initial={{ 
            x: startPosition.x, 
            y: startPosition.y, 
            scale: 1,
            opacity: 0.8 
          }}
          animate={{ 
            x: window.innerWidth - 60, 
            y: 80, 
            scale: 0.5,
            opacity: 0 
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            type: "spring",
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 animate-spin-slow opacity-70"></div>
            <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-blue-600 dark:text-blue-400 text-xs font-bold"
              >
                +1
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 