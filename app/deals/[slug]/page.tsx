"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ExternalLink, 
  Clock, 
  Tag, 
  Bookmark, 
  Share2, 
  ThumbsUp, 
  ThumbsDown,
  Shield,
  Zap,
  AlertTriangle,
  BarChart3,
  Users,
  Flame,
  MessageSquare,
  Store,
  Copy,
  BookmarkCheck,
  ChevronLeft,
  CheckCircle
} from 'lucide-react';
import { DealDiscussion } from '@/app/components/deals/DealDiscussion';
import { useCartStore } from '@/app/store/cart';
import { useParams, useRouter } from 'next/navigation';
import { mockDeals } from '@/app/data/mockDeals';
import { type Deal } from '@/app/hooks/useDeals';

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  
  // Fetch deal data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just use our mock data
      const foundDeal = mockDeals.find(d => d.slug === slug);
      
      if (foundDeal) {
        setDeal(foundDeal);
        setSelectedImage(foundDeal.image);
        setVotes(foundDeal.votes);
      } else {
        setError('Deal not found');
      }
    } catch (err) {
      setError('Failed to load deal');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);
  
  // Handle voting
  const handleVote = (direction: 'up' | 'down') => {
    if (!deal) return;
    
    if (voteStatus === direction) {
      // Undo vote
      setVoteStatus(null);
      setVotes(direction === 'up' ? votes - 1 : votes + 1);
    } else {
      // Change vote
      const voteChange = voteStatus === null ? 1 : 2;
      setVoteStatus(direction);
      setVotes(direction === 'up' ? votes + voteChange : votes - voteChange);
    }
  };
  
  // Handle copy coupon code
  const handleCopyCoupon = () => {
    if (deal?.couponCode) {
      navigator.clipboard.writeText(deal.couponCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  // Handle share
  const handleShare = async () => {
    if (navigator.share && deal) {
      try {
        await navigator.share({
          title: deal.title,
          text: `Check out this deal: ${deal.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  // Calculate time remaining
  const getTimeRemaining = (expiresIn: string) => {
    return expiresIn;
  };
  
  // Calculate discount percentage
  const calculateDiscount = (original: number, deal: number) => {
    return Math.round(((original - deal) / original) * 100);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error || !deal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Error</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error || 'Deal not found'}</p>
        <button
          onClick={() => router.push('/deals')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Deals
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm">
            <Link 
              href="/deals" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Deals
            </Link>
            <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-gray-100">{deal.title}</span>
          </nav>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              {/* Main Image */}
              <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Image 
                  src={selectedImage || deal.image} 
                  alt={deal.title}
                  fill
                  className="object-contain"
                />
                
                {/* Deal badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {deal.isHot && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
                      <Flame className="h-3 w-3" />
                      <span>Hot Deal</span>
                    </div>
                  )}
                  
                  {deal.isVerified && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                
                {/* Discount badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-bold">
                  {calculateDiscount(deal.originalPrice, deal.dealPrice)}% OFF
                </div>
                
                {/* Free shipping badge */}
                {deal.freeShipping && (
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-purple-600 text-white text-xs font-medium">
                    Free Shipping
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images (if we had multiple images) */}
              {deal.images && deal.images.length > 0 && (
                <div className="p-4 grid grid-cols-5 gap-2">
                  <button
                    onClick={() => setSelectedImage(deal.image)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                      selectedImage === deal.image ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <Image 
                      src={deal.image} 
                      alt={deal.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                  
                  {deal.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                        selectedImage === img ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <Image 
                        src={img} 
                        alt={`${deal.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Deal Description */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Deal Description</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">{deal.description}</p>
                
                {deal.longDescription && (
                  <div className="mt-4">
                    <p className="text-gray-700 dark:text-gray-300">{deal.longDescription}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Discussion Section */}
            <div className="mt-6">
              <DealDiscussion dealId={deal.id} />
            </div>
          </div>
          
          {/* Right Column - Deal Info */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm p-6 sticky top-4">
              {/* Deal Title */}
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {deal.title}
              </h1>
              
              {/* Store Info */}
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-6 w-6 rounded-full overflow-hidden">
                  <Image 
                    src={deal.storeImage} 
                    alt={deal.store}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{deal.store}</span>
                <a 
                  href={`https://${deal.store.toLowerCase().replace(/\s+/g, '')}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Visit store"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${deal.dealPrice.toFixed(2)}
                </span>
                <span className="text-lg line-through text-gray-500">
                  ${deal.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {calculateDiscount(deal.originalPrice, deal.dealPrice)}% off
                </span>
              </div>
              
              {/* Deal Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`px-3 py-1 rounded-md text-sm font-medium ${
                  deal.dealRating === 'epic' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                    : deal.dealRating === 'good' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                }`}>
                  {deal.dealRating === 'epic' ? 'Epic Deal' : deal.dealRating === 'good' ? 'Good Deal' : 'Average Deal'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Deal Score: <span className="font-medium">{deal.dealScore.toFixed(1)}</span>
                </div>
              </div>
              
              {/* Meta Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span>Category: {deal.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Store className="h-4 w-4 text-gray-400" />
                  <span>Store: {deal.store}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Posted: {deal.postedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Expires: {getTimeRemaining(deal.expiresIn)}</span>
                </div>
              </div>
              
              {/* Coupon Code */}
              {deal.couponCode && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Coupon Code</h3>
                  {showCoupon ? (
                    <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <code className="text-base font-mono text-blue-600 dark:text-blue-400 flex-1">
                        {deal.couponCode}
                      </code>
                      <button 
                        onClick={handleCopyCoupon}
                        className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Copy coupon code"
                      >
                        <Copy className="h-5 w-5 text-gray-500" />
                      </button>
                      <AnimatePresence>
                        {isCopied && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-8 bg-black text-white text-xs px-2 py-1 rounded"
                          >
                            Copied!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowCoupon(true)}
                      className="w-full py-2 px-4 text-sm font-medium text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Show Coupon Code
                    </button>
                  )}
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <a 
                  href={`https://${deal.store.toLowerCase().replace(/\s+/g, '')}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Go to Deal</span>
                </a>
                
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1 transition-colors ${
                      isBookmarked 
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark deal"}
                  >
                    {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                    <span className="text-xs">Save</span>
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex flex-col items-center justify-center gap-1"
                    aria-label="Share deal"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="text-xs">Share</span>
                  </button>
                  
                  <button 
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex flex-col items-center justify-center gap-1"
                    aria-label="View comments"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs">Comments</span>
                  </button>
                </div>
              </div>
              
              {/* Vote Buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleVote('up')}
                    className={`p-2 rounded-md transition-colors ${
                      voteStatus === 'up' 
                        ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30' 
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-label="Upvote"
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </button>
                  <span className="text-lg font-medium">{votes}</span>
                  <button 
                    onClick={() => handleVote('down')}
                    className={`p-2 rounded-md transition-colors ${
                      voteStatus === 'down' 
                        ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30' 
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-label="Downvote"
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Posted by <span className="font-medium">{deal.postedBy}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 