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

  return {
    productData,
    isLoading,
    isError,
  };
}
