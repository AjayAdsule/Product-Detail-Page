import { Truck, RotateCcw, Shield, Lock } from 'lucide-react';
import styles from './deliverysection.module.scss';

const DeliverySection = () => {
  return (
    <div className={styles.deliverySection}>
      <div className={styles.deliveryEstimate}>
        <Truck className={styles.deliveryIcon} size={20} />
        <div className={styles.deliveryInfo}>
          <p className={styles.deliveryDate}>Delivered in 2 days</p>
          <p className={styles.deliveryNote}>Free shipping on orders over ₹1000</p>
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
  );
};

export default DeliverySection;
