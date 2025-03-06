'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Shield, Cpu } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  features: string[];
  releaseYear: number;
  techLevel: 1 | 2 | 3 | 4 | 5;
}

export default function QuantumProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Futuristic products data
  const products: Product[] = [
    {
      id: "quantum-processor",
      name: "Quantum Neural Processor X9000",
      description: "Revolutionary quantum computing chip with neural network integration for unprecedented processing power.",
      price: 2999.99,
      image: "/images/products/quantum-processor.jpg",
      category: "Computing",
      rating: 4.9,
      features: [
        "9000 qubits processing power",
        "Neural network integration",
        "Self-learning architecture",
        "Holographic interface compatibility"
      ],
      releaseYear: 2082,
      techLevel: 5
    },
    {
      id: "holographic-display",
      name: "HoloSphere Display System",
      description: "True 360° holographic display with tactile feedback and gesture control.",
      price: 1899.99,
      image: "/images/products/holographic-display.jpg",
      category: "Displays",
      rating: 4.7,
      features: [
        "360° viewing angle",
        "Tactile feedback system",
        "Advanced gesture recognition",
        "8K resolution per eye"
      ],
      releaseYear: 2079,
      techLevel: 4
    },
    {
      id: "neural-interface",
      name: "NeuroLink Pro Interface",
      description: "Direct neural interface for seamless human-computer interaction with thought control.",
      price: 3499.99,
      image: "/images/products/neural-interface.jpg",
      category: "Interfaces",
      rating: 4.8,
      features: [
        "Direct thought control",
        "Emotional response detection",
        "Memory enhancement",
        "Dream recording capability"
      ],
      releaseYear: 2085,
      techLevel: 5
    }
  ];
  
  // Auto-rotate products
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering, products.length]);
  
  // Get tech level indicator
  const getTechLevelIndicator = (level: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <div 
          key={index} 
          className={`h-1 w-4 rounded-full ${
            index < level 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
              : 'bg-gray-300 dark:bg-gray-700'
          }`}
        />
      ));
  };
  
  return (
    <div className="w-full py-16 overflow-hidden bg-gray-50 dark:bg-gray-900 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-scan-lines opacity-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium mb-4"
          >
            <Cpu className="h-4 w-4 mr-2" />
            Quantum Technology
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
          >
            Future Tech from 2080+
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl"
          >
            Experience tomorrow's technology today with our quantum-powered products from the future
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Product Image */}
          <div 
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Tech level indicator */}
            <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <div className="flex space-x-1">
                {getTechLevelIndicator(products[activeProduct].techLevel)}
              </div>
            </div>
            
            {/* Release year */}
            <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm text-white font-mono">
              {products[activeProduct].releaseYear}
            </div>
            
            {/* Product image with holographic effect */}
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-4/5 h-4/5">
                <Image
                  src={products[activeProduct].image || "/images/products/placeholder.jpg"}
                  alt={products[activeProduct].name}
                  fill
                  className="object-contain"
                />
                
                {/* Holographic effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 mix-blend-overlay animate-hologram pointer-events-none" />
                
                {/* Scan line effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent z-10 opacity-0 group-hover:opacity-100"
                  animate={{ 
                    top: ['-100%', '100%'],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>
            
            {/* Product selector dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProduct(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeProduct === index
                      ? 'bg-blue-500 w-6'
                      : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`View product ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {products[activeProduct].category}
                </span>
                <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{products[activeProduct].rating.toFixed(1)}</span>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {products[activeProduct].name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {products[activeProduct].description}
              </p>
              
              <div className="flex items-baseline mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${products[activeProduct].price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  or 4 payments of ${(products[activeProduct].price / 4).toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Features */}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Quantum Features
              </h4>
              
              <ul className="space-y-2">
                {products[activeProduct].features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-3">
                      <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse-glow" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/products/${products[activeProduct].id}`}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                View Details
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              
              <button
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                Add to Cart
                <Zap className="h-5 w-5 ml-2" />
              </button>
            </div>
            
            {/* Quantum certification */}
            <div className="flex items-center pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3 animate-pulse-glow">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">Quantum Certified™</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Verified future technology</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 