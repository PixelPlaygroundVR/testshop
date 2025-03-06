import { useState, useEffect, useMemo } from 'react';

// Define types
export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  image: string;
  slug: string;
  category: string;
  store: string;
  storeImage: string;
  postedBy: string;
  postedTime: string;
  expiresIn: string;
  votes: number;
  comments: number;
  isHot: boolean;
  isVerified: boolean;
  couponCode?: string;
  freeShipping?: boolean;
  dealScore: number;
  dealRating: 'epic' | 'good' | 'average' | 'poor';
}

export type SortOption = 
  | 'newest' 
  | 'hottest' 
  | 'price_asc' 
  | 'price_desc' 
  | 'most_upvoted' 
  | 'deal_score';

interface UseDealsOptions {
  initialDeals: Deal[];
  defaultSort?: SortOption;
  defaultCategory?: string;
}

export function useDeals({ 
  initialDeals, 
  defaultSort = 'hottest',
  defaultCategory = 'All Categories'
}: UseDealsOptions) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>(initialDeals);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [sortBy, setSortBy] = useState<SortOption>(defaultSort);
  const [showHotDealsOnly, setShowHotDealsOnly] = useState(false);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get unique categories from deals
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    uniqueCategories.add('All Categories');
    
    deals.forEach((deal: Deal) => {
      uniqueCategories.add(deal.category);
    });
    
    return Array.from(uniqueCategories);
  }, [deals]);
  
  // Filter and sort deals
  useEffect(() => {
    let result = [...deals];
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      result = result.filter(deal => deal.category === selectedCategory);
    }
    
    // Filter hot deals
    if (showHotDealsOnly) {
      result = result.filter(deal => deal.isHot);
    }
    
    // Filter verified deals
    if (showVerifiedOnly) {
      result = result.filter(deal => deal.isVerified);
    }
    
    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        deal => 
          deal.title.toLowerCase().includes(query) || 
          deal.description.toLowerCase().includes(query) ||
          deal.category.toLowerCase().includes(query)
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'newest':
        // In a real app, you'd sort by date
        // For now, we'll just use the mock data order
        break;
      case 'hottest':
        result.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0));
        break;
      case 'price_asc':
        result.sort((a, b) => a.dealPrice - b.dealPrice);
        break;
      case 'price_desc':
        result.sort((a, b) => b.dealPrice - a.dealPrice);
        break;
      case 'most_upvoted':
        result.sort((a, b) => b.votes - a.votes);
        break;
      case 'deal_score':
        result.sort((a, b) => b.dealScore - a.dealScore);
        break;
      default:
        break;
    }
    
    setFilteredDeals(result);
  }, [deals, selectedCategory, sortBy, showHotDealsOnly, showVerifiedOnly, searchQuery]);
  
  // Add a new deal
  const addDeal = (deal: Deal) => {
    setDeals((prevDeals: Deal[]) => [deal, ...prevDeals]);
  };
  
  // Update a deal
  const updateDeal = (id: string, updatedDeal: Partial<Deal>) => {
    setDeals((prevDeals: Deal[]) => 
      prevDeals.map((deal: Deal) => 
        deal.id === id ? { ...deal, ...updatedDeal } : deal
      )
    );
  };
  
  // Remove a deal
  const removeDeal = (id: string) => {
    setDeals((prevDeals: Deal[]) => prevDeals.filter((deal: Deal) => deal.id !== id));
  };
  
  // Vote on a deal
  const voteDeal = (id: string, direction: 'up' | 'down') => {
    setDeals((prevDeals: Deal[]) => 
      prevDeals.map((deal: Deal) => {
        if (deal.id === id) {
          return {
            ...deal,
            votes: direction === 'up' ? deal.votes + 1 : deal.votes - 1
          };
        }
        return deal;
      })
    );
  };
  
  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('All Categories');
    setSortBy(defaultSort);
    setShowHotDealsOnly(false);
    setShowVerifiedOnly(false);
    setSearchQuery('');
  };
  
  return {
    deals,
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
    addDeal,
    updateDeal,
    removeDeal,
    voteDeal,
    resetFilters
  };
} 