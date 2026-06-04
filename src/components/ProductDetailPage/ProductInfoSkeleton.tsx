import Skeleton from '../ui/Skeleton';
import styles from './productinfoskeleton.module.scss';

const ProductInfoSkeleton = () => {
  return (
    <div className={styles.productInfo}>
      <Skeleton className={styles.brand} />

      <Skeleton className={styles.titleLine1} />
      <Skeleton className={styles.titleLine2} />

      <div className={styles.rating}>
        <Skeleton className={styles.starRow} />
      </div>

      <hr className={styles.divider} />

      <div className={styles.priceRow}>
        <Skeleton className={styles.salePrice} />
        <Skeleton className={styles.originalPrice} />
        <Skeleton className={styles.discount} />
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <Skeleton className={styles.label} />

        <div className={styles.colors}>
          <Skeleton className={styles.color} />
          <Skeleton className={styles.color} />
          <Skeleton className={styles.color} />
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <Skeleton className={styles.label} />

        <div className={styles.sizes}>
          <Skeleton className={styles.size} />
          <Skeleton className={styles.size} />
          <Skeleton className={styles.size} />
          <Skeleton className={styles.size} />
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <Skeleton className={styles.quantityLabel} />

        <div className={styles.quantity}>
          <Skeleton className={styles.qtyBtn} />
          <Skeleton className={styles.qtyInput} />
          <Skeleton className={styles.qtyBtn} />
        </div>
      </div>

      <hr className={styles.divider} />

      <Skeleton className={styles.delivery} />

      <Skeleton className={styles.button} />
    </div>
  );
};

export default ProductInfoSkeleton;
