import styles from './size.module.scss';
import { Route as ProductRoute } from './../../routes/product/$productId';
import type { ProductSize } from '../../types/product';

const Size = ({
  sizes,
  selectedSizeData,
}: {
  sizes: ProductSize[];
  selectedSizeData: ProductSize;
}) => {
  const navigate = ProductRoute.useNavigate();
  const { selectedSize } = ProductRoute.useSearch();

  const handleSizeSelect = (sizeName: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        selectedSize: sizeName,
      }),
    });
  };

  return (
    <div className={styles.sizeSection}>
      <p className={styles.sectionLabel}>
        Size: <span>{selectedSize || 'Select'}</span>
      </p>

      <div className={styles.sizes}>
        {sizes.map((size) => {
          const isLowStock = size.stock > 0 && size.stock <= 5;
          const isSoldOut = size.stock === 0;

          return (
            <button
              key={size.label}
              className={`${styles.sizeButton} ${
                selectedSize === size.label ? styles.sizeActive : ''
              } ${isLowStock ? styles.sizeLowStock : ''} ${isSoldOut ? styles.sizeSoldOut : ''}`}
              onClick={() => handleSizeSelect(size.label)}
              disabled={isSoldOut}
              aria-label={`Size ${size.label}`}
            >
              {size.label}
            </button>
          );
        })}
      </div>

      {selectedSizeData && selectedSizeData.stock > 0 && selectedSizeData.stock <= 5 && (
        <p className={styles.lowStockNote}>Only {selectedSizeData.stock} left in stock!</p>
      )}
    </div>
  );
};

export default Size;
