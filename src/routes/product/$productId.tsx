import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailPageProvider } from '../../stores/ProductDetails/ProductDetailConext';

export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ProductDetailPageProvider productId={1}>
      <main className="container">
        <div className="pdp__layout">
          <div>Image </div>
          <div>product detail</div>
        </div>
      </main>
    </ProductDetailPageProvider>
  );
}
