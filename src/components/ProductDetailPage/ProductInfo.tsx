import { useState } from 'react';
import styles from './ProductInfo.module.scss';
import Button from '../ui/Button';

type StockStatus = 'available' | 'low-stock' | 'sold-out';

interface ColorOption {
  name: string;
  hex: string;
}

interface SizeOption {
  label: string;
  status: StockStatus;
  stock: number;
}

interface ProductInfoProps {
  brand: string;
  title: string;
  price: number;
  originalPrice?: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  deliveryEstimate?: string;
  onAddToCart: (quantity: number, color: string, size: string) => void;
}

const ProductInfo = ({
  brand,
  title,
  price,
  originalPrice,
  colors,
  sizes,
  deliveryEstimate,
  onAddToCart,
}: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const selectedSizeData = sizes.find((s) => s.label === selectedSize);
  const maxStock = selectedSizeData?.stock ?? 1;
  const isSoldOut = selectedSizeData?.status === 'sold-out';

  const lowStockSize = sizes.find((s) => s.status === 'low-stock');

  const handleAddToCart = () => {
    if (!selectedSize || isSoldOut) return;
    onAddToCart(quantity, selectedColor, selectedSize);
  };

  return (
    <div className={styles.productInfo}>
      <div>
        <p className={styles.brand}>{brand}</p>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <hr className={styles.divider} />

      <div className={styles.priceBlock}>
        {originalPrice ? (
          <>
            <span className={styles.salePrice}>${price.toFixed(2)}</span>
            <span className={styles.originalPrice}>${originalPrice.toFixed(2)}</span>
          </>
        ) : (
          <span className={styles.regularPrice}>${price.toFixed(2)}</span>
        )}
      </div>

      <hr className={styles.divider} />

      <div>
        <p className={styles.sectionLabel}>
          Color: <span>{selectedColor}</span>
        </p>
        <div className={styles.swatches}>
          {colors.map((color) => (
            <button
              key={color.name}
              className={`${styles.swatch} ${selectedColor === color.name ? styles.swatchActive : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => setSelectedColor(color.name)}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div>
        <p className={styles.sectionLabel}>
          Size: <span>{selectedSize || 'Select'}</span>
        </p>
        <div className={styles.sizes}>
          {sizes.map((size) => (
            <Button
              key={size.label}
              variant="ghost"
              stockStatus={size.status}
              isActive={selectedSize === size.label}
              onClick={() => {
                if (size.status === 'sold-out') return;
                setSelectedSize(size.label);
                setQuantity(1);
              }}
            >
              {size.label}
            </Button>
          ))}
        </div>

        {lowStockSize && selectedSize === lowStockSize.label && (
          <p className={styles.lowStockNote}>Only {lowStockSize.stock} left</p>
        )}
      </div>

      <div>
        <p className={styles.sectionLabel}>Quantity</p>
        <div className={styles.quantityBlock}>
          <Button
            variant="icon"
            ariaLabel="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => q - 1)}
          >
            −
          </Button>

          <span className={styles.quantityValue}>{quantity}</span>

          <Button
            variant="icon"
            ariaLabel="Increase quantity"
            disabled={quantity >= maxStock || !selectedSize}
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className={styles.cartSection}>
        <Button variant="primary" disabled={!selectedSize || isSoldOut} onClick={handleAddToCart}>
          🛒 Add to Cart
        </Button>

        {deliveryEstimate && <p className={styles.deliveryNote}>{deliveryEstimate}</p>}
      </div>
    </div>
  );
};

export default ProductInfo;
