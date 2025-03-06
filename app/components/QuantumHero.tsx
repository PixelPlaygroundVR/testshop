'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Zap, Sparkles, ArrowRight } from 'lucide-react';

export default function QuantumHero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero slides data
  const slides = [
    {
      title: "Quantum Computing Devices",
      subtitle: "Experience the power of quantum processing",
      description: "Explore our range of quantum computers and neural interfaces that redefine what's possible.",
      cta: "Shop Quantum Tech",
      image: "/images/hero/quantum-computing.jpg",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Neural Interface Systems",
      subtitle: "Connect your mind to the digital realm",
      description: "Direct neural interfaces with zero latency and full sensory feedback for immersive experiences.",
      cta: "Discover Neural Tech",
      image: "/images/hero/neural-interface.jpg",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Holographic Displays",
      subtitle: "Visualize data in true 3D space",
      description: "True volumetric displays with tactile feedback and gesture control for the ultimate visual experience.",
      cta: "View Holographics",
      image: "/images/hero/holographic-display.jpg",
      color: "from-cyan-600 to-blue-600"
    }
  ];
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would navigate to search results
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <div className="relative min-h-[600px] md:min-h-[700px] overflow-hidden bg-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 z-0"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-blue-500 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.7, 0.2, 0.7],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Animated scan line */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent z-0"
        animate={{ 
          top: ['-100%', '100%'],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-8">
            {/* Search bar */}
            <div className="max-w-md">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search quantum products..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
            
            {/* Hero text content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 text-sm font-medium">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>{slides[currentSlide].subtitle}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {slides[currentSlide].title}
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-lg">
                  {slides[currentSlide].description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/products"
                    className={`px-6 py-3 rounded-lg bg-gradient-to-r ${slides[currentSlide].color} text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center`}
                  >
                    {slides[currentSlide].cta}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                  
                  <Link
                    href="/cart"
                    className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white font-medium border border-white/20 hover:bg-white/20 transition-colors flex items-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    View Cart
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 pt-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                      <Zap className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">2080+</div>
                      <div className="text-sm text-gray-400">Future Tech</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Sparkles className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-sm text-gray-400">Quantum Accuracy</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Slide indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index
                      ? 'bg-blue-500 w-6'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Hero image */}
          <div className="relative h-[400px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  backgroundImage: `url(${slides[currentSlide].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${slides[currentSlide].color} opacity-40 mix-blend-overlay`}></div>
                
                {/* Holographic effect */}
                <div className="absolute inset-0 bg-scan-lines opacity-20"></div>
                
                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    animate={{ 
                      left: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                    animate={{ 
                      right: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
                    animate={{ 
                      top: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
                    animate={{ 
                      bottom: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* Floating tech elements */}
                <div className="absolute inset-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      <div className="h-3 w-3 rounded-full bg-white animate-pulse-glow"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
} 