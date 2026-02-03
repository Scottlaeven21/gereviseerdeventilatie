export interface Product {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  category: ProductCategory;
  images: string[];
  inStock: boolean;
  stock?: number;
  sku: string;
  specs?: ProductSpecs;
  features?: string[];
  relatedProducts?: number[];
}

export type ProductCategory = 
  | 'mechanische-ventilatoren'
  | 'wtw-units'
  | 'filters'
  | 'flexibele-slangen'
  | 'ventielen';

export interface ProductSpecs {
  [key: string]: string | number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  description: string;
  image: string;
}
