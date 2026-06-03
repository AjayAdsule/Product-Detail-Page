import { useState } from 'react';
import { Star, Truck, RotateCcw, Shield, Lock } from 'lucide-react';
import styles from './ProductInfo.module.scss';

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
  title,
  price,
  originalPrice,
  rating = 4.8,
  reviewCount = 327,
  colors,
  sizes,
  deliveryEstimate = 'Delivery in 2–3 business days',
  onAddToCart,
}: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState<ButtonState>('default');

  const selectedSizeData = sizes.find((s) => s.label === selectedSize);
  const maxStock = selectedSizeData?.stock ?? 1;
  const isSoldOut = selectedSizeData?.status === 'sold-out';
  const isLowStock = selectedSizeData?.status === 'low-stock';

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
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

  const handleSizeChange = (newSize: string) => {
    const sizeData = sizes.find((s) => s.label === newSize);
    if (sizeData?.status === 'sold-out') return;

    setSelectedSize(newSize);
    // Reset quantity to 1 when size changes
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const capped = Math.min(Math.max(newQuantity, 1), maxStock);
    setQuantity(capped);
  };

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
      {/* HEADER SECTION */}
      <div className={styles.header}>
        <p className={styles.brand}>{brand}</p>
        <h1 className={styles.title}>{title}</h1>

        {rating && (
          <div className={styles.rating}>
            {renderStars(rating)}
            <span className={styles.ratingScore}>{rating}</span>
            <span className={styles.ratingCount}>({reviewCount} reviews)</span>
          </div>
        )}
      </div>

      <hr className={styles.divider} />

      {/* PRICE SECTION */}
      <div className={styles.priceSection}>
        <div className={styles.priceBlock}>
          {originalPrice ? (
            <>
              <span className={styles.salePrice}>${price.toFixed(2)}</span>
              <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
              {discountPercent > 0 && <span className={styles.badge}>Save {discountPercent}%</span>}
            </>
          ) : (
            <span className={styles.regularPrice}>${price.toFixed(2)}</span>
          )}
        </div>
      </div>

      <hr className={styles.divider} />

      {/* COLOR SWATCHES SECTION */}
      <div className={styles.colorSection}>
        <p className={styles.sectionLabel}>
          Color: <span>{selectedColor}</span>
        </p>
        <div className={styles.swatches}>
          {colors.map((color) => (
            <button
              key={color.name}
              className={`${styles.swatch} ${
                selectedColor === color.name ? styles.swatchActive : ''
              }`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.name)}
              aria-label={`Select ${color.name}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* SIZE BUTTONS SECTION */}
      <div className={styles.sizeSection}>
        <p className={styles.sectionLabel}>
          Size: <span>{selectedSize || 'Select'}</span>
        </p>
        <div className={styles.sizes}>
          {sizes.map((size) => (
            <button
              key={size.label}
              className={`${styles.sizeButton} ${
                selectedSize === size.label ? styles.sizeActive : ''
              } ${size.status === 'low-stock' ? styles.sizeLowStock : ''} ${
                size.status === 'sold-out' ? styles.sizeSoldOut : ''
              }`}
              onClick={() => handleSizeChange(size.label)}
              disabled={size.status === 'sold-out'}
              aria-label={`Size ${size.label}`}
            >
              {size.label}
            </button>
          ))}
        </div>

        {isLowStock && selectedSizeData?.stock && (
          <p className={styles.lowStockNote}>Only {selectedSizeData.stock} left in stock!</p>
        )}
      </div>

      {/* QUANTITY SECTION */}
      <div className={styles.quantitySection}>
        <p className={styles.sectionLabel}>Quantity</p>
        <div className={styles.quantityBlock}>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={styles.quantityValue}>{quantity}</span>
          <button
            className={styles.quantityButton}
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxStock || !selectedSize}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* ADD TO CART SECTION */}
      <div className={styles.cartSection}>
        <button
          className={`${styles.addToCartButton} ${
            buttonState === 'loading' ? styles.loading : ''
          } ${buttonState === 'success' ? styles.success : ''}`}
          onClick={handleAddToCart}
          disabled={!selectedSize || isSoldOut || buttonState === 'loading'}
          aria-label="Add product to cart"
        >
          {getButtonLabel()}
        </button>

        {deliveryEstimate && !isSoldOut && (
          <p className={styles.deliveryNote}>{deliveryEstimate}</p>
        )}
      </div>

      <hr className={styles.divider} />

      {/* DELIVERY SECTION */}
      {!isSoldOut && (
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
      )}
    </div>
  );
};

export default ProductInfo;
