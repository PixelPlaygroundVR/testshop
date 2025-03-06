'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Zap, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function QuantumCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [addingItem, setAddingItem] = useState<string | null>(null);
  const [portalEffect, setPortalEffect] = useState(false);
  
  // Mock cart data
  useEffect(() => {
    // In a real app, this would come from a cart store or API
    setItems([
      {
        id: '1',
        name: 'Quantum Neural Processor X9000',
        price: 2999.99,
        quantity: 1,
        image: '/images/products/quantum-processor.jpg'
      },
      {
        id: '2',
        name: 'HoloSphere Display System',
        price: 1899.99,
        quantity: 1,
        image: '/images/products/holographic-display.jpg'
      }
    ]);
  }, []);
  
  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Handle quantity change
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Handle item removal
  const removeItem = (id: string) => {
    setAddingItem(id);
    setPortalEffect(true);
    
    // Animate removal
    setTimeout(() => {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      setAddingItem(null);
      setPortalEffect(false);
    }, 500);
  };
  
  // Simulate adding an item to cart with portal effect
  const addItemWithEffect = () => {
    // This would be triggered when adding an item from a product page
    const newItem: CartItem = {
      id: '3',
      name: 'NeuroLink Pro Interface',
      price: 3499.99,
      quantity: 1,
      image: '/images/products/neural-interface.jpg'
    };
    
    setAddingItem(newItem.id);
    setPortalEffect(true);
    
    setTimeout(() => {
      setItems(prev => [...prev, newItem]);
      
      setTimeout(() => {
        setAddingItem(null);
        setPortalEffect(false);
      }, 500);
    }, 500);
  };
  
  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ShoppingCart className="h-6 w-6" />
        
        {/* Item count badge */}
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>
      
      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-lg z-50 overflow-hidden"
            >
              {/* Cart Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                  Quantum Cart
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Add some quantum products to get started</p>
                    <button
                      onClick={addItemWithEffect}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Demo Item
                    </button>
                  </div>
                ) : (
                  <>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={item.id === addingItem ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={`relative bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex gap-3 overflow-hidden ${
                          item.id === addingItem ? 'z-10' : 'z-0'
                        }`}
                      >
                        {/* Portal effect */}
                        {item.id === addingItem && portalEffect && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 15], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full z-0"
                            style={{ transformOrigin: 'center' }}
                          />
                        )}
                        
                        {/* Item Image */}
                        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                          <Image
                            src={item.image || '/images/products/placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          
                          {/* Holographic effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay animate-hologram pointer-events-none" />
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {item.name}
                          </h4>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            ${item.price.toFixed(2)}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors self-start"
                        >
                          <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                    
                    {/* Add Demo Item Button */}
                    <button
                      onClick={addItemWithEffect}
                      className="w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Demo Item
                    </button>
                  </>
                )}
              </div>
              
              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  {/* Quantum Security Badge */}
                  <div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center mr-3">
                      <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-blue-800 dark:text-blue-300">Quantum Secured Checkout</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">Transactions protected by quantum encryption</div>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 dark:text-gray-300">Total</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                  </div>
                  
                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Quantum Checkout
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 