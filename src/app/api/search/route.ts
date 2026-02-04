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
      .select('id, name, slug, price, category, images, stock_quantity')
      .or(
        `name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
      )
      .limit(10)
      .order('name');
    
    // Parse images from JSON string and format for frontend
    const productsWithImages = (products || []).map(p => {
      let imageUrl = null;
      try {
        const imagesArray = JSON.parse(p.images || '[]');
        imageUrl = imagesArray[0] || null;
      } catch (e) {
        imageUrl = null;
      }
      
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: parseFloat(p.price),
        category: p.category,
        image_url: imageUrl,
        stock: p.stock_quantity || 0
      };
    });

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
