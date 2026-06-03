import { useState } from 'react';
import { Star, Truck, RotateCcw, Shield, Lock } from 'lucide-react';
import styles from './ProductInfo.module.scss';
import { useProductDetailPageContext } from '../../stores/ProductDetails/useProductDetailContext';
import Colors from './Colors';
import Size from './Size';
import Quantity from './Quantity';
import { Route as ProductRoute } from './../../routes/product/$productId';
type StockStatus = 'available' | 'low-stock' | 'sold-out';
type ButtonState = 'default' | 'loading' | 'success';

interface ColorOption {
  name: string;
  hex: string;
}

interface SizeOption {
  label: string;
  status: StockStatus;
  stock?: number;
}

interface ProductInfoProps {
  brand: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  deliveryEstimate?: string;
  onAddToCart?: (quantity: number, color: string, size: string) => void;
}

const ProductInfo = ({
  brand,

  originalPrice = 999,
  rating = 4.8,

  colors,
  sizes,
  deliveryEstimate = 'Delivery in 2–3 business days',
  onAddToCart,
}: ProductInfoProps) => {
  // const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.name ?? '');
  // const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState<ButtonState>('default');

  const { product } = useProductDetailPageContext();

  // const selectedSizeData = product?.sizes.find((s) => s.label === selectedSize);
  // const maxStock = selectedSizeData?.stock ?? 1;
  // const isSoldOut = selectedSizeData?.status === 'sold-out';
  // const isLowStock = selectedSizeData?.status === 'low-stock';

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - product?.price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = async () => {
    if (!selectedSize || isSoldOut) return;

    setButtonState('loading');

    try {
      // Simulate API call
      if (onAddToCart) {
        await Promise.all([
          new Promise((resolve) => setTimeout(resolve, 800)), // simulate delay
          onAddToCart(quantity, selectedColor, selectedSize),
        ]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setButtonState('success');
      setTimeout(() => setButtonState('default'), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setButtonState('default');
    }
  };

  const { selectedColor, selectedSize } = ProductRoute.useSearch();

  const selectedVariant = product?.variants?.find(
    (variant) => variant.color.name === selectedColor
  );

  const selectedSizeData = selectedVariant?.sizes.find((size) => size.label === selectedSize);

  const renderStars = (count: number) => {
    return (
      <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={styles.star}
            size={16}
            fill={i < Math.floor(count) ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  const getButtonLabel = () => {
    if (buttonState === 'loading') return <span className={styles.spinner} />;
    if (buttonState === 'success') return '✓ Added to Cart';
    return '🛒 Add to Cart';
  };

  return (
    <div className={styles.productInfo}>
      <div className={styles.header}>
        <p className={styles.brand}>{brand}</p>
        <h1 className={styles.title}>{product.title}</h1>

        {rating && (
          <div className={styles.rating}>
            {renderStars(rating)}
            <span className={styles.ratingScore}>{product?.rating?.rate}</span>
            <span className={styles.ratingCount}>({product?.rating?.count} reviews)</span>
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.priceSection}>
        <div className={styles.priceBlock}>
          {originalPrice ? (
            <>
              <span className={styles.salePrice}>&#8377;{product?.price?.toFixed(2)}</span>
              <span className={styles.originalPrice}>&#8377;{originalPrice.toFixed(2)}</span>
              {discountPercent > 0 && <span className={styles.badge}>Save {discountPercent}%</span>}
            </>
          ) : (
            <span className={styles.regularPrice}>&#8377;{product?.price?.toFixed(2)}</span>
          )}
        </div>
      </div>

      <hr className={styles.divider} />

      <Colors colors={product.variants.map((variant) => variant.color)} />

      <Size sizes={selectedVariant?.sizes ?? []} selectedSizeData={selectedSizeData} />

      <Quantity quantity={quantity} maxStock={selectedSizeData?.stock ?? 0} />

      <div className={styles.cartSection}>
        <button
          className={`${styles.addToCartButton} ${
            buttonState === 'loading' ? styles.loading : ''
          } ${buttonState === 'success' ? styles.success : ''}`}
          onClick={handleAddToCart}
          // disabled={!selectedSize || isSoldOut || buttonState === 'loading'}
          aria-label="Add product to cart"
        >
          {getButtonLabel()}
        </button>

        {/* {deliveryEstimate && !isSoldOut && (
          <p className={styles.deliveryNote}>{deliveryEstimate}</p>
        )} */}
      </div>

      <hr className={styles.divider} />

      {/* DELIVERY SECTION */}
      {/* {!isSoldOut && (
        <div className={styles.deliverySection}>
          <div className={styles.deliveryEstimate}>
            <Truck className={styles.deliveryIcon} size={20} />
            <div className={styles.deliveryInfo}>
              <p className={styles.deliveryDate}>{deliveryEstimate}</p>
              <p className={styles.deliveryNote}>Free shipping on orders over $100</p>
            </div>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <RotateCcw className={styles.badgeIcon} size={20} />
              <p className={styles.badgeText}>Free Returns</p>
            </div>
            <div className={styles.badge}>
              <Shield className={styles.badgeIcon} size={20} />
              <p className={styles.badgeText}>2-Year Warranty</p>
            </div>
            <div className={styles.badge}>
              <Lock className={styles.badgeIcon} size={20} />
              <p className={styles.badgeText}>Secure Checkout</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductInfo;
