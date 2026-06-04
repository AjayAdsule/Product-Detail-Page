import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailPageProvider } from '../../stores/ProductDetails/ProductDetailProvider';
import ProductInfo from '../../components/ProductDetailPage/ProductInfo';
import ImageGallery from '../../components/ProductDetailPage/ImageGallery';
import ProductDetails from '../../components/ProductDetailPage/ProductDetails';
import { z } from 'zod';
import Navbar from '../../components/ProductDetailPage/Navbar';
export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
  validateSearch: z.object({
    selectedColor: z.string().optional(),
    selectedSize: z.string().optional(),
    quantity: z.number().optional(),
  }),
});

function RouteComponent() {
  return (
    <ProductDetailPageProvider productId={1}>
      <main className="container">
        <Navbar />
        <div className="pdp__layout">
          <div>
            <ImageGallery />
          </div>
          <div>
            <ProductInfo brand="Nike" />
          </div>
        </div>
        <ProductDetails />
      </main>
    </ProductDetailPageProvider>
  );
}
