'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Tag, 
  Store, 
  DollarSign, 
  Percent, 
  Link as LinkIcon, 
  Calendar, 
  CheckCircle, 
  X, 
  Info
} from 'lucide-react';
import { type Deal } from '@/app/hooks/useDeals';

interface SubmitDealFormProps {
  onSubmit: (deal: Omit<Deal, 'id' | 'votes' | 'comments' | 'dealScore' | 'dealRating'>) => void;
  categories: string[];
  onCancel: () => void;
}

export default function SubmitDealForm({ onSubmit, categories, onCancel }: SubmitDealFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    originalPrice: '',
    dealPrice: '',
    category: '',
    store: '',
    storeUrl: '',
    couponCode: '',
    expiresIn: '',
    freeShipping: false,
    isHot: false,
    isVerified: false,
    image: null as File | null,
    imagePreview: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ 
        ...prev, 
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
      
      if (errors.image) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.originalPrice.trim()) newErrors.originalPrice = 'Original price is required';
    if (!formData.dealPrice.trim()) newErrors.dealPrice = 'Deal price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.store.trim()) newErrors.store = 'Store name is required';
    if (!formData.expiresIn.trim()) newErrors.expiresIn = 'Expiration is required';
    
    // Validate prices
    const originalPrice = parseFloat(formData.originalPrice);
    const dealPrice = parseFloat(formData.dealPrice);
    
    if (isNaN(originalPrice)) newErrors.originalPrice = 'Must be a valid number';
    if (isNaN(dealPrice)) newErrors.dealPrice = 'Must be a valid number';
    if (originalPrice <= 0) newErrors.originalPrice = 'Must be greater than 0';
    if (dealPrice <= 0) newErrors.dealPrice = 'Must be greater than 0';
    if (dealPrice >= originalPrice) newErrors.dealPrice = 'Must be less than original price';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Calculate discount percentage
      const originalPrice = parseFloat(formData.originalPrice);
      const dealPrice = parseFloat(formData.dealPrice);
      const discount = Math.round(((originalPrice - dealPrice) / originalPrice) * 100);
      
      // In a real app, you would upload the image to a storage service
      // and get back a URL. For this example, we'll use a placeholder.
      const imageUrl = formData.imagePreview || '/images/deals/placeholder.jpg';
      
      // Create slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      // Create new deal object
      const newDeal = {
        title: formData.title,
        description: formData.description,
        originalPrice,
        dealPrice,
        discount,
        image: imageUrl,
        slug,
        category: formData.category,
        store: formData.store,
        storeImage: '/images/stores/placeholder.jpg', // Placeholder
        postedBy: 'current_user', // In a real app, this would be the current user
        postedTime: 'Just now',
        expiresIn: formData.expiresIn,
        isHot: formData.isHot,
        isVerified: formData.isVerified,
        couponCode: formData.couponCode || undefined,
        freeShipping: formData.freeShipping
      };
      
      // Submit the deal
      onSubmit(newDeal);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        originalPrice: '',
        dealPrice: '',
        category: '',
        store: '',
        storeUrl: '',
        couponCode: '',
        expiresIn: '',
        freeShipping: false,
        isHot: false,
        isVerified: false,
        image: null,
        imagePreview: ''
      });
    } catch (error) {
      console.error('Error submitting deal:', error);
      setErrors(prev => ({ ...prev, submit: 'Failed to submit deal. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submit a New Deal</h2>
        <button
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Deal Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Deal Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the deal title"
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the deal in detail"
            rows={3}
            className={`w-full px-4 py-2 rounded-lg border ${
              errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
            } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
        
        {/* Price Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Original Price*
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.originalPrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {errors.originalPrice && <p className="mt-1 text-sm text-red-500">{errors.originalPrice}</p>}
          </div>
          
          <div>
            <label htmlFor="dealPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Deal Price*
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="dealPrice"
                name="dealPrice"
                value={formData.dealPrice}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.dealPrice ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {errors.dealPrice && <p className="mt-1 text-sm text-red-500">{errors.dealPrice}</p>}
          </div>
        </div>
        
        {/* Category and Store */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category*
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none`}
              >
                <option value="">Select a category</option>
                {categories.filter(cat => cat !== 'All Categories').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>
          
          <div>
            <label htmlFor="store" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Store Name*
            </label>
            <div className="relative">
              <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="store"
                name="store"
                value={formData.store}
                onChange={handleChange}
                placeholder="Enter store name"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.store ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {errors.store && <p className="mt-1 text-sm text-red-500">{errors.store}</p>}
          </div>
        </div>
        
        {/* Store URL and Expiration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="storeUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Store URL (optional)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="storeUrl"
                name="storeUrl"
                value={formData.storeUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="expiresIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expires In*
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="expiresIn"
                name="expiresIn"
                value={formData.expiresIn}
                onChange={handleChange}
                placeholder="e.g. 3 days, 1 week"
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  errors.expiresIn ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            {errors.expiresIn && <p className="mt-1 text-sm text-red-500">{errors.expiresIn}</p>}
          </div>
        </div>
        
        {/* Coupon Code */}
        <div>
          <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Coupon Code (optional)
          </label>
          <input
            type="text"
            id="couponCode"
            name="couponCode"
            value={formData.couponCode}
            onChange={handleChange}
            placeholder="Enter coupon code if available"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {/* Deal Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Deal Image (optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image"
              className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                formData.imagePreview ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {formData.imagePreview ? (
                <div className="relative w-full h-full">
                  <img
                    src={formData.imagePreview}
                    alt="Deal preview"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">Click to change</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 5MB</p>
                </div>
              )}
              <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="freeShipping"
              checked={formData.freeShipping}
              onChange={handleChange}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Free Shipping</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isHot"
              checked={formData.isHot}
              onChange={handleChange}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Mark as Hot Deal</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleChange}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">I've verified this deal works</span>
          </label>
        </div>
        
        {/* Submission Error */}
        {errors.submit && (
          <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg flex items-center gap-2">
            <Info className="h-4 w-4" />
            <p className="text-sm">{errors.submit}</p>
          </div>
        )}
        
        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Deal'}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 