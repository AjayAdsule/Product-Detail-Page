import { createContext, useContext } from 'react';
import useProducts from '../../hooks/useProducts';

const ProductDetailPageContext = createContext(null);

export const ProductDetailPageProvider = ({
  productId,
  children,
}: {
  productId: number;
  children: React.ReactNode;
}) => {
  const { productData, isError, isLoading } = useProducts(productId);
  return (
    <ProductDetailPageContext.Provider value={{ productData, isError, isLoading }}>
      {children}
    </ProductDetailPageContext.Provider>
  );
};

export const useProuductDetailPageContext = () => {
  const context = useContext(ProductDetailPageContext);
  if (!context) {
    throw new Error('ProductDetailPageContext must be used within a ProductDetailPageContext');
  }
  return context;
};
