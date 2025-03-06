"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Zap } from 'lucide-react';
import { CartItem as CartItemType } from '@/app/store/cart';
import { useCartStore } from '@/app/store/cart';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const [isHovering, setIsHovering] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      handleRemove();
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    // Add a small delay for the animation to complete
    setTimeout(() => {
      removeItem(item.id);
    }, 300);
  };

  return (
    <motion.div 
      className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700 relative overflow-hidden"
      initial={{ opacity: 1, height: "auto" }}
      animate={{ 
        opacity: isRemoving ? 0 : 1,
        height: isRemoving ? 0 : "auto",
        scale: isRemoving ? 0.8 : 1
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Quantum scan effect on hover */}
      {isHovering && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute top-0 h-full w-1 bg-blue-500 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
          <div className="absolute inset-y-0 left-0 w-full h-1 bg-blue-500/20 animate-[scan_2s_ease-in-out_infinite]"></div>
        </motion.div>
      )}
      
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        {item.image ? (
          <div className="relative h-full w-full">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
            {/* Holographic overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0"
              animate={{ opacity: isHovering ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ) : (
          <div className="h-full w-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400 text-xs">No image</span>
          </div>
        )}
        
        {/* Quantum verification badge */}
        <div className="absolute bottom-0 right-0 bg-blue-600 rounded-tl-md p-1">
          <Zap className="h-3 w-3 text-white" />
        </div>
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <motion.h3 
            className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center"
            animate={{ color: isHovering ? "#3b82f6" : "" }}
          >
            {item.name}
            <motion.span 
              className="ml-2 text-xs text-blue-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovering ? 1 : 0 }}
            >
              ID:{item.id.substring(0, 4)}
            </motion.span>
          </motion.h3>
          <motion.p 
            className="text-sm font-medium text-gray-900 dark:text-gray-100 font-mono"
            key={item.price * item.quantity}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            ${(item.price * item.quantity).toFixed(2)}
          </motion.p>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center border rounded-md bg-white dark:bg-gray-800 relative overflow-hidden">
            {/* Futuristic background for quantity controls */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDecrement}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </motion.button>
            
            <motion.span 
              className="px-2 text-sm bg-gray-50 dark:bg-gray-700 font-mono"
              key={item.quantity}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
            >
              {item.quantity}
            </motion.span>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleIncrement}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 relative"
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
            {/* Glow effect on hover */}
            <motion.div 
              className="absolute inset-0 bg-red-500 rounded-full blur-md"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.2 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
} 