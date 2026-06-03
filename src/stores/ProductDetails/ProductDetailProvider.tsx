import useProducts from '../../hooks/useProducts';
import { ProductDetailPageContext } from './ProductDetailsContext';

export const ProductDetailPageProvider = ({
  productId,
  children,
}: {
  productId: number;
  children: React.ReactNode;
}) => {
  const { product, isError, isLoading } = useProducts(productId);
  return (
    <ProductDetailPageContext.Provider value={{ product, isError, isLoading }}>
      {children}
    </ProductDetailPageContext.Provider>
  );
};
