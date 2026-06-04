import { createContext } from 'react';
import type { Product } from '../../types/product';
import type { AddToCartPayload, CartItem } from '../../types/cart';

interface ProductDetailPageContextType {
  product: Product;
  isLoading: boolean;
  isError: boolean;
  cart: CartItem[];
  handleAddToCart: (payload: AddToCartPayload) => void;
}

export const ProductDetailPageContext = createContext<ProductDetailPageContextType | null>(null);
