"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Flame, 
  Clock, 
  Zap, 
  Tag, 
  ChevronDown, 
  Search, 
  SlidersHorizontal,
  Sparkles,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import DealCard from './DealCard';
import { useDeals, type SortOption } from '@/app/hooks/useDeals';
import { mockDeals } from '@/app/data/mockDeals';
import DealsFilter from './DealsFilter';

interface DealsSectionProps {
  showTitle?: boolean;
  maxDeals?: number;
  defaultCategory?: string;
  defaultSort?: SortOption;
}

export default function DealsSection({ 
  showTitle = true, 
  maxDeals = 12,
  defaultCategory = 'All Categories',
  defaultSort = 'hottest'
}: DealsSectionProps) {
  // Calculate max price for price range filter
  const maxPrice = useMemo(() => {
    return Math.ceil(Math.max(...mockDeals.map(deal => deal.originalPrice)));
  }, []);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  
  const {
    filteredDeals,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    showHotDealsOnly,
    setShowHotDealsOnly,
    showVerifiedOnly,
    setShowVerifiedOnly,
    searchQuery,
    setSearchQuery,
    resetFilters
  } = useDeals({
    initialDeals: mockDeals,
    defaultSort,
    defaultCategory
  });
  
  // Apply price filter
  const priceFilteredDeals = useMemo(() => {
    return filteredDeals.filter(
      deal => deal.dealPrice >= priceRange[0] && deal.dealPrice <= priceRange[1]
    );
  }, [filteredDeals, priceRange]);
  
  // Limit the number of deals shown
  const displayedDeals = priceFilteredDeals.slice(0, maxDeals);
  
  // Reset all filters including price range
  const handleResetAllFilters = () => {
    resetFilters();
    setPriceRange([0, maxPrice]);
  };
  
  return (
    <div className="w-full">
      {showTitle && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400">
            Quantum Deals
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Discover the best deals on futuristic tech from across the quantum realm
          </p>
        </div>
      )}
      
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>
      
      {/* Filters */}
      <DealsFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showHotDealsOnly={showHotDealsOnly}
        setShowHotDealsOnly={setShowHotDealsOnly}
        showVerifiedOnly={showVerifiedOnly}
        setShowVerifiedOnly={setShowVerifiedOnly}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        maxPrice={maxPrice}
        resetFilters={handleResetAllFilters}
      />
      
      {/* Deals Grid */}
      {displayedDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium">No deals found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Try adjusting your filters or search query
          </p>
          <button
            onClick={handleResetAllFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
} 