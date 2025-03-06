"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Clock, 
  Flame, 
  CheckCircle, 
  Tag, 
  Copy, 
  ExternalLink,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { type Deal } from '@/app/hooks/useDeals';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState(deal.votes);
  const [isCopied, setIsCopied] = useState(false);
  
  // Calculate discount percentage
  const discountPercentage = Math.round(((deal.originalPrice - deal.dealPrice) / deal.originalPrice) * 100);
  
  // Handle voting
  const handleVote = (direction: 'up' | 'down') => {
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
    if (deal.couponCode) {
      navigator.clipboard.writeText(deal.couponCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Hot deal badge */}
      {deal.isHot && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">
          <Flame className="h-3 w-3" />
          <span>Hot</span>
        </div>
      )}
      
      {/* Verified badge */}
      {deal.isVerified && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
          <CheckCircle className="h-3 w-3" />
          <span>Verified</span>
        </div>
      )}
      
      {/* Deal image */}
      <Link href={`/deals/${deal.slug}`} className="block relative aspect-[16/9] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-0" />
        <Image 
          src={deal.image || '/images/placeholder.jpg'} 
          alt={deal.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Discount badge */}
        <div className="absolute bottom-3 left-3 z-10 px-2 py-1 rounded-md bg-blue-600 text-white text-sm font-bold">
          {discountPercentage}% OFF
        </div>
        
        {/* Free shipping badge */}
        {deal.freeShipping && (
          <div className="absolute bottom-3 right-3 z-10 px-2 py-1 rounded-md bg-purple-600 text-white text-xs font-medium">
            Free Shipping
          </div>
        )}
        
        {/* Futuristic scan effect */}
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
      </Link>
      
      {/* Deal content */}
      <div className="p-4">
        {/* Store info */}
        <div className="flex items-center gap-2 mb-2">
          <div className="relative h-5 w-5 rounded-full overflow-hidden">
            <Image 
              src={deal.storeImage || '/images/stores/placeholder.jpg'} 
              alt={deal.store}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">{deal.store}</span>
        </div>
        
        {/* Title */}
        <Link href={`/deals/${deal.slug}`}>
          <h3 className="text-lg font-semibold line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {deal.title}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {deal.description}
        </p>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ${deal.dealPrice.toFixed(2)}
          </span>
          <span className="text-sm line-through text-gray-500">
            ${deal.originalPrice.toFixed(2)}
          </span>
        </div>
        
        {/* Deal rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`px-2 py-0.5 rounded text-xs font-medium ${
            deal.dealRating === 'epic' 
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
              : deal.dealRating === 'good' 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            {deal.dealRating === 'epic' ? 'Epic Deal' : deal.dealRating === 'good' ? 'Good Deal' : 'Average Deal'}
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500">{deal.category}</span>
          </div>
        </div>
        
        {/* Coupon code */}
        {deal.couponCode && (
          <div className="mb-3">
            {showCoupon ? (
              <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400 flex-1">
                  {deal.couponCode}
                </code>
                <button 
                  onClick={handleCopyCoupon}
                  className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Copy coupon code"
                >
                  <Copy className="h-4 w-4 text-gray-500" />
                </button>
                {isCopied && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-4 -bottom-8 bg-black text-white text-xs px-2 py-1 rounded"
                  >
                    Copied!
                  </motion.div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setShowCoupon(true)}
                className="w-full py-1.5 px-3 text-sm font-medium text-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Show Coupon Code
              </button>
            )}
          </div>
        )}
        
        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{deal.postedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Expires: {deal.expiresIn}</span>
          </div>
        </div>
      </div>
      
      {/* Deal actions */}
      <div className="flex items-center justify-between p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {/* Vote buttons */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => handleVote('up')}
            className={`p-1 rounded-md transition-colors ${
              voteStatus === 'up' 
                ? 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30' 
                : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Upvote"
          >
            <ThumbsUp className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">{votes}</span>
          <button 
            onClick={() => handleVote('down')}
            className={`p-1 rounded-md transition-colors ${
              voteStatus === 'down' 
                ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30' 
                : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Downvote"
          >
            <ThumbsDown className="h-4 w-4" />
          </button>
        </div>
        
        {/* Other actions */}
        <div className="flex items-center gap-2">
          <Link 
            href={`/deals/${deal.slug}`}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{deal.comments}</span>
          </Link>
          
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1 rounded-md transition-colors ${
              isBookmarked 
                ? 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30' 
                : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark deal"}
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
          
          <a 
            href={`https://${deal.store.toLowerCase().replace(/\s+/g, '')}.com`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Visit store"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
} 