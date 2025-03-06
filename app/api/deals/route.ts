import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isHot = searchParams.get('hot');
    const isVerified = searchParams.get('verified');
    const sortBy = searchParams.get('sort') || 'newest';
    const limit = parseInt(searchParams.get('limit') || '12');
    const page = parseInt(searchParams.get('page') || '1');
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('deals')
      .select('*, categories(name, slug)')
      .range(offset, offset + limit - 1);
    
    // Apply filters
    if (category) {
      query = query.eq('categories.slug', category);
    }
    
    if (isHot === 'true') {
      query = query.eq('is_hot', true);
    }
    
    if (isVerified === 'true') {
      query = query.eq('is_verified', true);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'hottest':
        query = query.order('is_hot', { ascending: false }).order('votes', { ascending: false });
        break;
      case 'price_asc':
        query = query.order('deal_price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('deal_price', { ascending: false });
        break;
      case 'most_upvoted':
        query = query.order('votes', { ascending: false });
        break;
      case 'deal_score':
        query = query.order('deal_score', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching deals:', error);
      return NextResponse.json(
        { error: 'Failed to fetch deals' },
        { status: 500 }
      );
    }
    
    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('deals')
      .select('*', { count: 'exact', head: true });
    
    return NextResponse.json({
      deals: data,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error in deals API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'title', 'description', 'original_price', 'deal_price', 
      'discount', 'image_url', 'slug', 'category_id', 'store', 
      'store_image', 'posted_by', 'expires_at'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Set default values for optional fields
    if (body.votes === undefined) body.votes = 0;
    if (body.is_hot === undefined) body.is_hot = false;
    if (body.is_verified === undefined) body.is_verified = false;
    if (body.free_shipping === undefined) body.free_shipping = false;
    if (body.posted_time === undefined) body.posted_time = 'Just now';
    
    // Calculate deal score if not provided
    if (body.deal_score === undefined) {
      const discountWeight = 0.5;
      const votesWeight = 0.3;
      const verifiedWeight = 0.2;
      
      const discountScore = body.discount / 100 * 10; // 0-10 based on discount percentage
      const votesScore = Math.min(body.votes / 100, 10); // Cap at 10
      const verifiedScore = body.is_verified ? 10 : 0;
      
      body.deal_score = (
        discountScore * discountWeight +
        votesScore * votesWeight +
        verifiedScore * verifiedWeight
      );
    }
    
    // Determine deal rating if not provided
    if (body.deal_rating === undefined) {
      if (body.deal_score >= 9) body.deal_rating = 'epic';
      else if (body.deal_score >= 7) body.deal_rating = 'good';
      else if (body.deal_score >= 5) body.deal_rating = 'average';
      else body.deal_rating = 'poor';
    }
    
    // Insert deal
    const { data, error } = await supabase
      .from('deals')
      .insert([body])
      .select();
    
    if (error) {
      console.error('Error creating deal:', error);
      return NextResponse.json(
        { error: 'Failed to create deal' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ deal: data[0] }, { status: 201 });
  } catch (error) {
    console.error('Error in deals API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 