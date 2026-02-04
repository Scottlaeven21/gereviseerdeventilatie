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
      .select('*')
      .or(
        `name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
      )
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Search failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: products || [],
      query,
      count: products?.length || 0,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
