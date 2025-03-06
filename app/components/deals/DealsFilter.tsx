'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ChevronDown, 
  Flame, 
  CheckCircle, 
  Tag, 
  Clock, 
  DollarSign, 
  Star, 
  Zap,
  X
} from 'lucide-react';
import { type SortOption } from '@/app/hooks/useDeals';

interface DealsFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showHotDealsOnly: boolean;
  setShowHotDealsOnly: (show: boolean) => void;
  showVerifiedOnly: boolean;
  setShowVerifiedOnly: (show: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
  resetFilters: () => void;
}

export default function DealsFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  showHotDealsOnly,
  setShowHotDealsOnly,
  showVerifiedOnly,
  setShowVerifiedOnly,
  priceRange,
  setPriceRange,
  maxPrice,
  resetFilters
}: DealsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  
  // Apply price range when slider interaction ends
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...localPriceRange] as [number, number];
    newRange[index] = newValue;
    
    // Ensure min <= max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[0] = newRange[1];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[1] = newRange[0];
    }
    
    setLocalPriceRange(newRange);
  };
  
  const handlePriceRangeApply = () => {
    setPriceRange(localPriceRange);
  };
  
  // Calculate active filters count
  const activeFiltersCount = [
    selectedCategory !== 'All Categories',
    showHotDealsOnly,
    showVerifiedOnly,
    priceRange[0] > 0 || priceRange[1] < maxPrice
  ].filter(Boolean).length;
  
  return (
    <div className="w-full mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  Categories
                </h3>
                <div className="space-y-1 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort Options */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  Sort By
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSortBy('hottest')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                      sortBy === 'hottest'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Flame className="h-4 w-4 text-orange-500" />
                    Hottest
                  </button>
                  <button
                    onClick={() => setSortBy('newest')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                      sortBy === 'newest'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Clock className="h-4 w-4 text-blue-500" />
                    Newest
                  </button>
                  <button
                    onClick={() => setSortBy('price_asc')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                      sortBy === 'price_asc'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => setSortBy('price_desc')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                      sortBy === 'price_desc'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => setSortBy('most_upvoted')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                      sortBy === 'most_upvoted'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Most Upvoted
                  </button>
                  <button
                    onClick={() => setSortBy('deal_score')}
                    className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-md transition-colors ${
                      sortBy === 'deal_score'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Star className="h-4 w-4 text-purple-500" />
                    Deal Score
                  </button>
                </div>
              </div>
              
              {/* Deal Types */}
              <div>
                <h3 className="font-medium mb-2">Deal Types</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showHotDealsOnly}
                      onChange={(e) => setShowHotDealsOnly(e.target.checked)}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>Hot Deals Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Verified Deals Only</span>
                  </label>
                </div>
                
                {/* Price Range */}
                <div className="mt-4">
                  <h3 className="font-medium mb-2 flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Price Range
                  </h3>
                  <div className="px-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">${localPriceRange[0]}</span>
                      <span className="text-sm">${localPriceRange[1]}</span>
                    </div>
                    <div className="relative mb-4 pt-1">
                      <div className="absolute h-1 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div 
                        className="absolute h-1 bg-blue-500 rounded"
                        style={{ 
                          left: `${(localPriceRange[0] / maxPrice) * 100}%`, 
                          width: `${((localPriceRange[1] - localPriceRange[0]) / maxPrice) * 100}%` 
                        }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={localPriceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e, 0)}
                        className="absolute w-full h-1 opacity-0 cursor-pointer"
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={localPriceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e, 1)}
                        className="absolute w-full h-1 opacity-0 cursor-pointer"
                      />
                      <div 
                        className="absolute h-4 w-4 bg-blue-500 rounded-full -mt-1.5 transform -translate-x-1/2"
                        style={{ left: `${(localPriceRange[0] / maxPrice) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute h-4 w-4 bg-blue-500 rounded-full -mt-1.5 transform -translate-x-1/2"
                        style={{ left: `${(localPriceRange[1] / maxPrice) * 100}%` }}
                      ></div>
                    </div>
                    <button
                      onClick={handlePriceRangeApply}
                      className="w-full py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      Apply Price Range
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Active Filters & Reset */}
              <div>
                <h3 className="font-medium mb-2">Active Filters</h3>
                <div className="space-y-2">
                  {selectedCategory !== 'All Categories' && (
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        <span className="text-sm">{selectedCategory}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedCategory('All Categories')}
                        className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {showHotDealsOnly && (
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      <div className="flex items-center gap-1">
                        <Flame className="h-3 w-3 text-orange-500" />
                        <span className="text-sm">Hot Deals Only</span>
                      </div>
                      <button 
                        onClick={() => setShowHotDealsOnly(false)}
                        className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {showVerifiedOnly && (
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-sm">Verified Deals Only</span>
                      </div>
                      <button 
                        onClick={() => setShowVerifiedOnly(false)}
                        className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span className="text-sm">${priceRange[0]} - ${priceRange[1]}</span>
                      </div>
                      <button 
                        onClick={() => setPriceRange([0, maxPrice])}
                        className="p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="w-full mt-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 