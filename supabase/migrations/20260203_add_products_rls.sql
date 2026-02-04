-- Add RLS policies for products table

-- Enable RLS if not already enabled
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Everyone can read products (for public website)
CREATE POLICY "Anyone can read products"
  ON public.products
  FOR SELECT
  TO public
  USING (true);

-- Only admins can insert/update/delete products
CREATE POLICY "Admins can manage products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
  )
  WITH CHECK (
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
  );
