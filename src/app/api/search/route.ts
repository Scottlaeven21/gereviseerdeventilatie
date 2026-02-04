import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json({ products: [], query: '' });
  }

  try {
    // Search in products by name, description, category
    // Using ilike for case-insensitive search
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, slug, price, category, stock')
      .or(
        `name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
      )
      .limit(10)
      .order('name');
    
    // Add image_url as null for now (can be added later when column exists)
    const productsWithImages = (products || []).map(p => ({
      ...p,
      image_url: null
    }));

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Search failed', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: productsWithImages,
      query,
      count: productsWithImages.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
