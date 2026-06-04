import useCart from '../../hooks/useCart';
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
  const { cart, handleAddToCart } = useCart();
  return (
    <ProductDetailPageContext.Provider
      value={{ product, isError, isLoading, cart, handleAddToCart }}
    >
      {children}
    </ProductDetailPageContext.Provider>
  );
};
