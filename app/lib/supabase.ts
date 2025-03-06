import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string;
          long_description: string | null;
          price: number;
          sale_price: number | null;
          category_id: string;
          image_url: string;
          additional_images: string[] | null;
          tech_level: number;
          release_year: number;
          features: string[] | null;
          in_stock: boolean;
          is_featured: boolean;
          slug: string;
          rating: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description: string;
          long_description?: string | null;
          price: number;
          sale_price?: number | null;
          category_id: string;
          image_url: string;
          additional_images?: string[] | null;
          tech_level: number;
          release_year: number;
          features?: string[] | null;
          in_stock?: boolean;
          is_featured?: boolean;
          slug: string;
          rating?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string;
          long_description?: string | null;
          price?: number;
          sale_price?: number | null;
          category_id?: string;
          image_url?: string;
          additional_images?: string[] | null;
          tech_level?: number;
          release_year?: number;
          features?: string[] | null;
          in_stock?: boolean;
          is_featured?: boolean;
          slug?: string;
          rating?: number | null;
        };
      };
      categories: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          image_url: string | null;
          slug: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          slug: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          slug?: string;
        };
      };
      users: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          role: 'user' | 'admin' | 'moderator';
        };
        Insert: {
          id?: string;
          created_at?: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin' | 'moderator';
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin' | 'moderator';
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total: number;
          shipping_address: string;
          payment_intent_id: string | null;
          tracking_number: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total: number;
          shipping_address: string;
          payment_intent_id?: string | null;
          tracking_number?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          total?: number;
          shipping_address?: string;
          payment_intent_id?: string | null;
          tracking_number?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
      reviews: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          product_id: string;
          rating: number;
          title: string | null;
          content: string;
          is_verified_purchase: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          product_id: string;
          rating: number;
          title?: string | null;
          content: string;
          is_verified_purchase?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          product_id?: string;
          rating?: number;
          title?: string | null;
          content?: string;
          is_verified_purchase?: boolean;
        };
      };
      deals: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          original_price: number;
          deal_price: number;
          discount: number;
          image_url: string;
          slug: string;
          category_id: string;
          store: string;
          store_image: string;
          posted_by: string;
          posted_time: string;
          expires_at: string;
          votes: number;
          is_hot: boolean;
          is_verified: boolean;
          coupon_code: string | null;
          free_shipping: boolean;
          deal_score: number;
          deal_rating: 'epic' | 'good' | 'average' | 'poor';
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          original_price: number;
          deal_price: number;
          discount: number;
          image_url: string;
          slug: string;
          category_id: string;
          store: string;
          store_image: string;
          posted_by: string;
          posted_time?: string;
          expires_at: string;
          votes?: number;
          is_hot?: boolean;
          is_verified?: boolean;
          coupon_code?: string | null;
          free_shipping?: boolean;
          deal_score?: number;
          deal_rating?: 'epic' | 'good' | 'average' | 'poor';
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string;
          original_price?: number;
          deal_price?: number;
          discount?: number;
          image_url?: string;
          slug?: string;
          category_id?: string;
          store?: string;
          store_image?: string;
          posted_by?: string;
          posted_time?: string;
          expires_at?: string;
          votes?: number;
          is_hot?: boolean;
          is_verified?: boolean;
          coupon_code?: string | null;
          free_shipping?: boolean;
          deal_score?: number;
          deal_rating?: 'epic' | 'good' | 'average' | 'poor';
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          deal_id: string;
          parent_id: string | null;
          content: string;
          votes: number;
          awards: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          deal_id: string;
          parent_id?: string | null;
          content: string;
          votes?: number;
          awards?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          deal_id?: string;
          parent_id?: string | null;
          content?: string;
          votes?: number;
          awards?: string[] | null;
        };
      };
    };
  };
}; 