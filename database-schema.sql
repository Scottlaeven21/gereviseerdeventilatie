-- Database Schema voor Gereviseerde Ventilatie
-- Te gebruiken met Supabase (PostgreSQL)

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  regular_price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  stock_status TEXT DEFAULT 'instock', -- instock, outofstock, onbackorder
  sku TEXT UNIQUE,
  weight TEXT,
  dimensions TEXT,
  category TEXT,
  subcategory TEXT,
  brand TEXT,
  images JSONB, -- Array van image URLs
  specifications JSONB, -- Key-value pairs van specs
  meta_data JSONB, -- Extra WooCommerce meta data
  featured BOOLEAN DEFAULT false,
  visibility TEXT DEFAULT 'visible',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  billing_address JSONB NOT NULL,
  shipping_address JSONB,
  items JSONB NOT NULL, -- Array van order items
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  order_status TEXT DEFAULT 'processing', -- processing, completed, cancelled
  mollie_payment_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers Table (optioneel, voor accounts)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  addresses JSONB, -- Array van adressen
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes voor performance
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Row Level Security (RLS) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read access voor producten
CREATE POLICY "Public products are viewable by everyone"
  ON products FOR SELECT
  USING (visibility = 'visible');

-- Orders alleen zichtbaar voor eigen klant (later met auth)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (true); -- Aanpassen na auth implementatie
