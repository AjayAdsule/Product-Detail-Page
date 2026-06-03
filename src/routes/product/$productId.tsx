import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailPageProvider } from '../../stores/ProductDetails/ProductDetailProvider';
import ProductInfo from '../../components/ProductDetailPage/ProductInfo';
import ImageGallery from '../../components/ProductDetailPage/ImageGallery';
import ProductDetails from '../../components/ProductDetailPage/ProductDetails';
import { z } from 'zod';
export const Route = createFileRoute('/product/$productId')({
  component: RouteComponent,
  validateSearch: z.object({
    selectedColor: z.string().optional(),
    selectedSize: z.string().optional(),
    quantity: z.number().optional().default(1),
  }),
});

function RouteComponent() {
  const productImages = [
    {
      src: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: '1image',
    },
    {
      src: 'https://images.unsplash.com/photo-1622260614927-208cfe3f5cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'second',
    },
    {
      src: 'https://images.unsplash.com/photo-1570630358718-4fb324824b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'third',
    },
    {
      src: 'https://images.unsplash.com/photo-1622260615656-96d7c7ad6c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'third',
    },
    {
      src: 'https://images.unsplash.com/photo-1770563182591-892c3180f66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'four',
    },
  ];
  return (
    <ProductDetailPageProvider productId={1}>
      <main className="container">
        <div className="pdp__layout">
          <div>
            <ImageGallery images={productImages} />
          </div>
          <div>
            <ProductInfo
              brand="Nike"
              title="Nike comfort shoes"
              colors={[
                { name: 'Green Forest', hex: '#1f5a43' },
                { name: 'Teal', hex: '#00d5be' },
                { name: 'Violet', hex: '#8e51ff' },
                { name: 'Rose', hex: '#ec003f' },
              ]}
              price={1199}
              sizes={[
                { label: 'SM', status: 'low-stock', stock: 5 },
                { label: 'MD', status: 'sold-out', stock: 0 },
                { label: 'LG', status: 'low-stock', stock: 1 },
                { label: 'XL', status: 'available', stock: 50 },
              ]}
              deliveryEstimate="Deliverd by 2 Days"
              onAddToCart={() => console.log('added')}
            />
          </div>
        </div>
        <ProductDetails
          description="The SummitX Alpine Expedition Backpack is engineered for serious adventurers..."
          specifications={[
            {
              label: 'Capacity',
              value: '65 Liters',
            },
            {
              label: 'Weight',
              value: '4.2 lbs',
            },
            {
              label: 'Material',
              value: '210D Ripstop Nylon',
            },
            {
              label: 'Waterproof Rating',
              value: 'IPX4',
            },
          ]}
          reviews={[
            {
              id: 1,
              name: 'Sarah Johnson',
              rating: 5,
              comment: 'Excellent backpack. Comfortable even on long hikes.',
            },
            {
              id: 2,
              name: 'Mark Peterson',
              rating: 4,
              comment: 'Great build quality and storage options.',
            },
            {
              id: 3,
              name: 'Emily Davis',
              rating: 5,
              comment: 'Used it on a 5-day trek and it performed perfectly.',
            },
          ]}
        />
      </main>
    </ProductDetailPageProvider>
  );
}
