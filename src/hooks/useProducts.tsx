import { useQuery } from '@tanstack/react-query';
import { httpMethods, httpRequest } from '../services/httpRequest';

export default function useProducts(productId: number) {
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`get_product_${productId}`],
    queryFn: () => httpRequest({ method: httpMethods.get, url: `/products/${productId}` }),
  });
  const product = {
    ...productData,
    variants: [
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
    ],
    deliveryEstimate: 'Deliverd by 2 Days',
  };

  return {
    product,
    isLoading,
    isError,
  };
}
