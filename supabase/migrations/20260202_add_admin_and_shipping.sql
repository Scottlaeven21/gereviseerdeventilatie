-- Create user_profiles table for additional user data
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'customer',
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.user_profiles;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);

-- Create shipping_categories table
CREATE TABLE IF NOT EXISTS public.shipping_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add RLS policies for shipping_categories
ALTER TABLE public.shipping_categories ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can read shipping categories" ON public.shipping_categories;
DROP POLICY IF EXISTS "Admins can manage shipping categories" ON public.shipping_categories;

-- Everyone can read shipping categories
CREATE POLICY "Anyone can read shipping categories"
  ON public.shipping_categories
  FOR SELECT
  TO public
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can manage shipping categories"
  ON public.shipping_categories
  FOR ALL
  TO authenticated
  USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- Add shipping_category_id to products
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS shipping_category_id uuid REFERENCES public.shipping_categories(id);

-- Add default shipping categories
INSERT INTO public.shipping_categories (name, price, description) VALUES
  ('Gratis Verzending', 0.00, 'Gratis verzending voor kleine producten'),
  ('Standaard Verzending', 6.95, 'Standaard pakketpost'),
  ('Groot Pakket', 14.95, 'Voor grotere ventilatieproducten'),
  ('Extra Groot / Pallet', 49.95, 'Voor zeer grote bestellingen of pallets')
ON CONFLICT DO NOTHING;

-- Create discount_codes table
CREATE TABLE IF NOT EXISTS public.discount_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value decimal(10,2) NOT NULL,
  description text,
  valid_from timestamptz DEFAULT now(),
  valid_until timestamptz,
  max_uses integer,
  current_uses integer DEFAULT 0,
  min_order_amount decimal(10,2) DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add RLS policies for discount_codes
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can read active discount codes" ON public.discount_codes;
DROP POLICY IF EXISTS "Admins can manage discount codes" ON public.discount_codes;

-- Everyone can read active discount codes
CREATE POLICY "Anyone can read active discount codes"
  ON public.discount_codes
  FOR SELECT
  TO public
  USING (active = true AND (valid_until IS NULL OR valid_until > now()));

-- Only admins can manage discount codes
CREATE POLICY "Admins can manage discount codes"
  ON public.discount_codes
  FOR ALL
  TO authenticated
  USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
  );

-- Add admin notes to orders
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS admin_notes text,
ADD COLUMN IF NOT EXISTS tracking_code text,
ADD COLUMN IF NOT EXISTS shipping_carrier text;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_shipping_categories_updated_at ON public.shipping_categories;
CREATE TRIGGER update_shipping_categories_updated_at
  BEFORE UPDATE ON public.shipping_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_discount_codes_updated_at ON public.discount_codes;
CREATE TRIGGER update_discount_codes_updated_at
  BEFORE UPDATE ON public.discount_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
