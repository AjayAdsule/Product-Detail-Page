export interface ProductRating {
  rate: number;
  count: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSize {
  label: 'SM' | 'MD' | 'LG' | 'XL' | string;
  stock: number;
}

export interface ProductVariant {
  color: ProductColor;
  sizes: ProductSize[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
  variants: ProductVariant[];
  deliveryEstimate: string;
}

export interface UseProductsReturn {
  product: Product;
  isLoading: boolean;
  isError: boolean;
}
