import { useContext } from 'react';
import { ProductDetailPageContext } from './ProductDetailsContext';

export const useProductDetailPageContext = () => {
  const context = useContext(ProductDetailPageContext);

  if (!context) {
    throw new Error('useProductDetailPageContext must be used within ProductDetailPageProvider');
  }

  return context;
};
