import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import styles from './Productinfo.module.scss';
import { useProductDetailPageContext } from '../../stores/ProductDetails/useProductDetailContext';
import Colors from './Colors';
import Size from './Size';
import Quantity from './Quantity';
import { Route as ProductRoute } from './../../routes/product/$productId';
import DeliverySection from './DeliverySection';
import ProductInfoSkeleton from './ProductInfoSkeleton';

type ButtonState = 'default' | 'loading' | 'success';

interface ProductInfoProps {
  brand: string;
  originalPrice?: number;
  rating?: number;
  deliveryEstimate?: string;
}

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

const ProductInfo = ({ brand, originalPrice = 999 }: ProductInfoProps) => {
  const [buttonState, setButtonState] = useState<ButtonState>('default');

  const { product, cart, handleAddToCart: addToCart, isLoading } = useProductDetailPageContext();
  const { selectedColor, selectedSize, quantity = 1 } = ProductRoute.useSearch();
  const discountPercent =
    originalPrice && product?.price
      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
      : 0;

  const isInCart = useMemo(
    () =>
      cart.some(
        (item) =>
          item.productId === product.id &&
          item.color === selectedColor &&
          item.size === selectedSize
      ),
    [cart, product.id, selectedColor, selectedSize]
  );

  const selectedVariant = product?.variants?.find(
    (variant) => variant.color.name === selectedColor
  );

  const selectedSizeData = selectedVariant?.sizes.find((size) => size.label === selectedSize);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize || !selectedSizeData) return;

    setButtonState('loading');

    try {
      addToCart({
        productId: String(product.id),
        productName: product.title as string,
        color: selectedColor,
        size: selectedSize,
        quantity,
        price: product.price as number,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));

      setButtonState('success');

      setTimeout(() => {
        setButtonState('default');
      }, 2000);
    } catch (error) {
      console.error(error);
      setButtonState('default');
    }
  };

  const getButtonLabel = () => {
    if (buttonState === 'loading') return 'Adding...';
    if (buttonState === 'success') return '✓ Added';
    if (isInCart) return 'Already in Cart';

    return 'Add to Cart';
  };

  const allSizes = useMemo(
    () => [
      ...new Map(
        product.variants.flatMap((v) => v.sizes).map((size) => [size.label, size])
      ).values(),
    ],
    [product.variants]
  );

  if (isLoading) {
    return <ProductInfoSkeleton />;
  }

  return (
    <div className={styles.productInfo}>
      <div className={styles.header}>
        <p className={styles.brand}>{brand}</p>
        <h2 className={styles.title}>{product.title}</h2>

        {product?.rating && (
          <div className={styles.rating}>
            {renderStars(product?.rating?.rate)}
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
              {discountPercent > 0 && (
                <span className={styles.discountBadge}>Save {discountPercent}%</span>
              )}
            </>
          ) : (
            <span className={styles.regularPrice}>&#8377;{product?.price?.toFixed(2)}</span>
          )}
        </div>
      </div>

      <hr className={styles.divider} />

      <Colors colors={product.variants.map((variant) => variant.color)} />
      <hr className={styles.divider} />
      <Size
        selectedSizeData={selectedSizeData}
        sizes={selectedColor ? (selectedVariant?.sizes ?? []) : allSizes}
      />
      <hr className={styles.divider} />
      <Quantity maxStock={selectedSizeData?.stock ?? 0} />
      <hr className={styles.divider} />
      <DeliverySection />
      <div className={styles.cartSection}>
        <button
          className={`${styles.addToCartButton} ${
            buttonState === 'loading' ? styles.loading : ''
          } ${buttonState === 'success' ? styles.success : ''}`}
          onClick={handleAddToCart}
          disabled={!selectedSize || buttonState === 'loading'}
          aria-label="Add product to cart"
        >
          {getButtonLabel()}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
