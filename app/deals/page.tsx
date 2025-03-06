"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Users, 
  MessageSquare, 
  Tag, 
  Plus, 
  ArrowRight, 
  Send 
} from 'lucide-react';
import DealsSection from '@/app/components/deals/DealsSection';
import SubmitDealForm from '@/app/components/deals/SubmitDealForm';
import { useDeals } from '@/app/hooks/useDeals';
import { mockDeals } from '@/app/data/mockDeals';

export default function DealsPage() {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  const {
    deals,
    addDeal,
    categories
  } = useDeals({
    initialDeals: mockDeals,
    defaultSort: 'hottest',
    defaultCategory: 'All Categories'
  });
  
  // Calculate stats
  const activeDeals = deals.length;
  const totalSavings = deals.reduce((sum, deal) => sum + (deal.originalPrice - deal.dealPrice), 0);
  const activeUsers = 1250; // Mock data
  const totalComments = deals.reduce((sum, deal) => sum + deal.comments, 0);
  
  // Handle new deal submission
  const handleDealSubmit = (newDeal: any) => {
    // In a real app, you would send this to your API
    // For now, we'll just add it to our local state
    addDeal({
      ...newDeal,
      id: `new-${Date.now()}`,
      votes: 1,
      comments: 0,
      dealScore: 8.0,
      dealRating: 'good'
    });
    
    setShowSubmitForm(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
            animate={{ 
              scaleX: [0, 1],
              opacity: [0, 1]
            }}
            transition={{ duration: 1.5 }}
          />
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 0.8, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Quantum Deals Community
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover and share the best deals on futuristic tech from across the quantum realm
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button 
                onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Tag className="h-5 w-5" />
                Browse Deals
              </button>
              
              <button 
                onClick={() => setShowSubmitForm(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Submit a Deal
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Flame className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{activeDeals}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Deals</p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Tag className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">${totalSavings.toFixed(2)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Savings by Users</p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Users className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{activeUsers}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
            </motion.div>
            
            <motion.div 
              className="p-6 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <MessageSquare className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{totalComments}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Deals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <DealsSection />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with the Latest Deals</h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter and never miss a quantum deal again
            </p>
            
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                <span>Subscribe</span>
              </button>
            </form>
            
            <p className="text-sm mt-4 opacity-80">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      {/* Submit Deal Modal */}
      <AnimatePresence>
        {showSubmitForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <SubmitDealForm 
              onSubmit={handleDealSubmit}
              categories={categories.filter(cat => cat !== 'All Categories')}
              onCancel={() => setShowSubmitForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 