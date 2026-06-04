import { useEffect, useState } from 'react';
import type { CartItem, AddToCartPayload, UseCartReturn } from '../types/cart';

const CART_STORAGE_KEY = 'cart';

export default function useCart(): UseCartReturn {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = ({
    productId,
    productName,
    color,
    size,
    quantity,
    price,
  }: AddToCartPayload) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === productId && item.color === color && item.size === size
      );

      if (existingItemIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [...prevCart, { productId, productName, color, size, quantity, price }];
    });
  };

  return { cart, handleAddToCart };
}
