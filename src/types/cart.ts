export interface CartItem {
  productId: number;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface AddToCartPayload {
  productId: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface UseCartReturn {
  cart: CartItem[];
  handleAddToCart: (payload: AddToCartPayload) => void;
}
