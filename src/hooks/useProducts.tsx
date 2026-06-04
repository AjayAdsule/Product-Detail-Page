import { useQuery } from '@tanstack/react-query';
import { httpMethods, httpRequest } from '../services/httpRequest';
import type { Product, ProductVariant, UseProductsReturn } from '../types/product';

const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    color: { name: 'Green Forest', hex: '#1f5a43' },
    sizes: [
      { label: 'SM', stock: 5 },
      { label: 'MD', stock: 0 },
      { label: 'LG', stock: 2 },
      { label: 'XL', stock: 10 },
    ],
  },
  {
    color: { name: 'Teal', hex: '#00d5be' },
    sizes: [
      { label: 'SM', stock: 1 },
      { label: 'MD', stock: 3 },
      { label: 'LG', stock: 0 },
      { label: 'XL', stock: 8 },
    ],
  },
  {
    color: { name: 'Violet', hex: '#8e51ff' },
    sizes: [
      { label: 'SM', stock: 0 },
      { label: 'MD', stock: 4 },
      { label: 'LG', stock: 12 },
      { label: 'XL', stock: 20 },
    ],
  },
];

export default function useProducts(productId: number): UseProductsReturn {
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: [`get_product_${productId}`],
    queryFn: () => httpRequest({ method: httpMethods.get, url: `/products/${productId}` }),
  });
  const product: Product = {
    ...productData,
    variants: PRODUCT_VARIANTS,
    deliveryEstimate: 'Delivered by 2 Days',
  };

  return {
    product,
    isLoading,
    isError,
  };
}
