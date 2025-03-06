"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Zap, 
  Shield, 
  Cpu, 
  Wifi, 
  Battery, 
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { useCartStore, CartItem } from '@/app/store/cart';
import { CartPortal } from '@/app/components/cart/CartPortal';

// Sample product data - in a real app, this would come from an API or database
const products = {
  'quantum-vr-headset': {
    id: '1',
    name: 'Quantum VR Headset',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2070&auto=format&fit=crop',
    description: 'Experience virtual reality like never before with the Quantum VR Headset. Featuring 8K resolution, 120Hz refresh rate, and a 110° field of view, this headset delivers unparalleled immersion. The lightweight design and adjustable straps ensure comfort during extended use, while the built-in spatial audio creates a truly immersive experience.',
    features: [
      '8K Resolution Display',
      '120Hz Refresh Rate',
      '110° Field of View',
      'Built-in Spatial Audio',
      'Lightweight Design',
      'Wireless Connectivity',
      '4-Hour Battery Life',
    ],
    category: 'VR',
    techSpecs: {
      processor: 'Quantum Neural Processor',
      memory: '16GB VRAM',
      connectivity: 'Quantum Entanglement Wi-Fi 7',
      battery: '5000mAh Fusion Cell',
      weight: '320g',
      dimensions: '170 x 110 x 90mm',
      compatibility: 'Universal Neural Interface',
    },
    quantumRating: 98,
    releaseYear: 2089,
  },
  'neotech-gaming-console': {
    id: '2',
    name: 'NeoTech Gaming Console',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop',
    description: 'The NeoTech Gaming Console redefines gaming with cutting-edge technology. Powered by a custom AMD processor and RDNA 2 GPU, it delivers stunning 4K gaming at up to 120 frames per second. The 1TB SSD ensures lightning-fast load times, while the innovative controller provides haptic feedback for an immersive gaming experience.',
    features: [
      'Custom AMD Processor',
      'RDNA 2 GPU Architecture',
      '4K Gaming at 120FPS',
      '1TB SSD Storage',
      'Haptic Feedback Controller',
      'Backward Compatibility',
      'Ray Tracing Support',
    ],
    category: 'Gaming',
    techSpecs: {
      processor: 'Neural Processor X12',
      memory: '12GB VRAM',
      connectivity: 'Quantum Wi-Fi 6E',
      battery: '4500mAh Fusion Cell',
      weight: Math.floor(Math.random() * 300 + 200) + 'g',
      dimensions: '160 x 100 x 80mm',
      compatibility: 'Universal Neural Interface',
    },
    quantumRating: Math.floor(Math.random() * 20 + 80),
    releaseYear: Math.floor(Math.random() * 10 + 2080),
  },
  'pixel-ultra-smartphone': {
    id: '3',
    name: 'Pixel Ultra Smartphone',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop',
    description: 'The Pixel Ultra Smartphone combines cutting-edge technology with elegant design. The 6.7" AMOLED display offers vibrant colors and deep blacks, while the advanced camera system captures stunning photos in any lighting condition. Powered by the latest processor and 12GB of RAM, this phone handles multitasking with ease.',
    features: [
      '6.7" AMOLED Display',
      'Advanced Camera System',
      'Latest Processor',
      '12GB RAM',
      '256GB Storage',
      'All-Day Battery Life',
      'Water and Dust Resistant',
    ],
    category: 'Smartphones',
    techSpecs: {
      processor: 'Neural Processor X12',
      memory: '12GB VRAM',
      connectivity: 'Quantum Wi-Fi 6E',
      battery: '4500mAh Fusion Cell',
      weight: Math.floor(Math.random() * 300 + 200) + 'g',
      dimensions: '160 x 100 x 80mm',
      compatibility: 'Universal Neural Interface',
    },
    quantumRating: Math.floor(Math.random() * 20 + 80),
    releaseYear: Math.floor(Math.random() * 10 + 2080),
  },
  'quantum-wireless-earbuds': {
    id: '4',
    name: 'Quantum Wireless Earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=2070&auto=format&fit=crop',
    description: 'Experience premium sound quality with the Quantum Wireless Earbuds. Featuring active noise cancellation and ambient sound mode, these earbuds adapt to your environment. The ergonomic design ensures a comfortable fit, while the 8-hour battery life keeps your music playing all day.',
    features: [
      'Active Noise Cancellation',
      'Ambient Sound Mode',
      'Ergonomic Design',
      '8-Hour Battery Life',
      'Touch Controls',
      'Voice Assistant Support',
      'IPX4 Water Resistance',
    ],
    category: 'Audio',
    techSpecs: {
      processor: 'Neural Processor X12',
      memory: '12GB VRAM',
      connectivity: 'Quantum Wi-Fi 6E',
      battery: '4500mAh Fusion Cell',
      weight: Math.floor(Math.random() * 300 + 200) + 'g',
      dimensions: '160 x 100 x 80mm',
      compatibility: 'Universal Neural Interface',
    },
    quantumRating: Math.floor(Math.random() * 20 + 80),
    releaseYear: Math.floor(Math.random() * 10 + 2080),
  },
  'nebula-smart-watch': {
    id: '5',
    name: 'Nebula Smart Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop',
    description: 'The Nebula Smart Watch is your perfect health and productivity companion. Track your fitness goals with advanced health monitoring, including heart rate, sleep, and stress levels. The always-on display shows notifications at a glance, while the 5-day battery life ensures you stay connected.',
    features: [
      'Advanced Health Monitoring',
      'Always-On Display',
      '5-Day Battery Life',
      'Water Resistant',
      'GPS Tracking',
      'Customizable Watch Faces',
      'Voice Assistant Integration',
    ],
    category: 'Wearables',
    techSpecs: {
      processor: 'Neural Processor X12',
      memory: '12GB VRAM',
      connectivity: 'Quantum Wi-Fi 6E',
      battery: '4500mAh Fusion Cell',
      weight: Math.floor(Math.random() * 300 + 200) + 'g',
      dimensions: '160 x 100 x 80mm',
      compatibility: 'Universal Neural Interface',
    },
    quantumRating: Math.floor(Math.random() * 20 + 80),
    releaseYear: Math.floor(Math.random() * 10 + 2080),
  },
  'fusion-gaming-laptop': {
    id: '6',
    name: 'Fusion Gaming Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop',
    description: 'Dominate the gaming world with the Fusion Gaming Laptop. Powered by the latest Intel Core i9 processor and NVIDIA RTX 3080 graphics, this laptop delivers exceptional gaming performance. The 15.6" 240Hz display ensures smooth gameplay, while the RGB keyboard adds a touch of style.',
    features: [
      'Intel Core i9 Processor',
      'NVIDIA RTX 3080 Graphics',
      '15.6" 240Hz Display',
      '32GB DDR4 RAM',
      '1TB NVMe SSD',
      'RGB Keyboard',
      'Advanced Cooling System',
    ],
    category: 'Laptops',
    techSpecs: {
      processor: 'Neural Processor X12',
      memory: '12GB VRAM',
      connectivity: 'Quantum Wi-Fi 6E',
      battery: '4500mAh Fusion Cell',
      weight: Math.floor(Math.random() * 300 + 200) + 'g',
      dimensions: '160 x 100 x 80mm',
      compatibility: 'Universal Neural Interface',
    },
    quantumRating: Math.floor(Math.random() * 20 + 80),
    releaseYear: Math.floor(Math.random() * 10 + 2080),
  },
};

// Add the extended data to other products
Object.keys(products).forEach(key => {
  if (key !== 'quantum-vr-headset') {
    products[key as keyof typeof products] = {
      ...products[key as keyof typeof products],
      techSpecs: {
        processor: 'Neural Processor X12',
        memory: '12GB VRAM',
        connectivity: 'Quantum Wi-Fi 6E',
        battery: '4500mAh Fusion Cell',
        weight: Math.floor(Math.random() * 300 + 200) + 'g',
        dimensions: '160 x 100 x 80mm',
        compatibility: 'Universal Neural Interface',
      },
      quantumRating: Math.floor(Math.random() * 20 + 80),
      releaseYear: Math.floor(Math.random() * 10 + 2080),
    };
  }
});

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [showHologram, setShowHologram] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [portalPosition, setPortalPosition] = useState({ x: 0, y: 0 });
  const { addItem } = useCartStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const product = products[params.slug as keyof typeof products];
  
  useEffect(() => {
    // Show hologram effect on page load
    setShowHologram(true);
    const timer = setTimeout(() => {
      setShowHologram(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link href="/shop" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
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

  return (
    <>
      <div className="container mx-auto px-4 py-8 relative">
        {/* Holographic initialization effect */}
        <AnimatePresence>
          {showHologram && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-black/70"></div>
              <motion.div 
                className="relative z-10 text-blue-500 font-mono flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-4xl mb-2 font-bold">INITIALIZING</div>
                <div className="text-xl mb-4">QUANTUM PRODUCT INTERFACE</div>
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-blue-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-blue-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  />
                  <motion.div 
                    className="h-2 w-2 rounded-full bg-blue-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/shop" className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Product image with holographic effects */}
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Holographic overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  background: [
                    "linear-gradient(to right top, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
                    "linear-gradient(to right top, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
                    "linear-gradient(to right top, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Tech scan lines */}
              <div className="absolute inset-0 bg-[url('/scan-lines.png')] opacity-20 mix-blend-overlay"></div>
              
              {/* Quantum rating badge */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-md px-3 py-2 text-blue-400 font-mono text-sm flex items-center">
                <Zap className="h-4 w-4 mr-2 text-blue-500" />
                <span>Q-Rating: </span>
                <span className="text-green-400 ml-1">{product.quantumRating}</span>
              </div>
              
              {/* Year badge */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-md px-3 py-2 text-blue-400 font-mono text-sm">
                <span>EST. {product.releaseYear}</span>
              </div>
              
              {/* Scan effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/10 to-blue-500/0 pointer-events-none"
                animate={{ 
                  y: ["-100%", "100%", "-100%"]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-2">
              <motion.span 
                className="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Zap className="h-3 w-3 mr-1 animate-pulse" />
                {product.category}
              </motion.span>
            </div>
            
            <motion.h1 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {product.name}
              {/* Futuristic underline */}
              <motion.div 
                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </motion.h1>
            
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono flex items-center">
                ${product.price.toFixed(2)}
                <span className="ml-1 text-xs text-blue-500">Ξ</span>
              </div>
              <div className="ml-4 flex items-center text-green-500 text-sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>Quantum verified</span>
              </div>
            </motion.div>
            
            {/* Tab navigation */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 px-1 relative ${activeTab === 'overview' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  Overview
                  {activeTab === 'overview' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="activeTab"
                    />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 px-1 relative ${activeTab === 'specs' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  Tech Specs
                  {activeTab === 'specs' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="activeTab"
                    />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('features')}
                  className={`pb-2 px-1 relative ${activeTab === 'features' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  Features
                  {activeTab === 'features' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <p className="text-gray-700 dark:text-gray-300">
                    {product.description}
                  </p>
                </motion.div>
              )}
              
              {activeTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6 font-mono"
                >
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center">
                      <Cpu className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-500 dark:text-gray-400 w-32">Processor:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.techSpecs.processor}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 text-blue-500 mr-2 flex items-center justify-center">
                        <span className="text-xs">GB</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 w-32">Memory:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.techSpecs.memory}</span>
                    </div>
                    <div className="flex items-center">
                      <Wifi className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-500 dark:text-gray-400 w-32">Connectivity:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.techSpecs.connectivity}</span>
                    </div>
                    <div className="flex items-center">
                      <Battery className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-500 dark:text-gray-400 w-32">Battery:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.techSpecs.battery}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 text-blue-500 mr-2 flex items-center justify-center">
                        <span className="text-xs">W</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 w-32">Weight:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.techSpecs.weight}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-4 w-4 text-blue-500 mr-2 flex items-center justify-center">
                        <span className="text-xs">3D</span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 w-32">Dimensions:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.techSpecs.dimensions}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-500 dark:text-gray-400 w-32">Compatibility:</span>
                      <span className="text-gray-900 dark:text-gray-100">{product.techSpecs.compatibility}</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-md mr-4 bg-white dark:bg-gray-800 relative overflow-hidden">
                {/* Futuristic background for quantity controls */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={decrementQuantity}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </motion.button>
                
                <motion.span 
                  className="px-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 font-mono"
                  key={quantity}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {quantity}
                </motion.span>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={incrementQuantity}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </motion.button>
              </div>
              
              <motion.button
                ref={buttonRef}
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors relative overflow-hidden"
              >
                {/* Futuristic background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative z-10 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span>Add to Quantum Cart</span>
                </div>
              </motion.button>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-50"></div>
              <div className="relative z-10 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                <span>Add to Wishlist</span>
              </div>
            </motion.button>
            
            {/* Security badge */}
            <div className="mt-6 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
              <Shield className="h-4 w-4 mr-1 text-green-500" />
              <span>Secured by Quantum Encryption</span>
            </div>
          </motion.div>
        </div>
        
        {/* Related products section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span>Related Quantum Products</span>
            <ChevronRight className="h-5 w-5 ml-2 text-blue-500" />
          </h2>
          
          {/* This would be a grid of related products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Placeholder for related products */}
          </div>
        </motion.div>
      </div>
      
      <CartPortal 
        isActive={showPortal} 
        productId={product.id} 
        startPosition={portalPosition} 
      />
    </>
  );
} 