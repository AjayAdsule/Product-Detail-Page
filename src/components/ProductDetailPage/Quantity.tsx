import styles from './quantity.module.scss';
import { Route as ProductRoute } from './../../routes/product/$productId';

const Quantity = ({ maxStock }) => {
  const navigate = ProductRoute.useNavigate();

  const { selectedSize, quantity = 1 } = ProductRoute.useSearch();

  const updateQuantity = (newQuantity: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        quantity: newQuantity,
      }),
    });
  };

  return (
    <div className={styles.quantitySection}>
      <p className={styles.sectionLabel}>Quantity</p>

      <div className={styles.quantityBlock}>
        <button
          className={styles.quantityButton}
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span className={styles.quantityValue}>{quantity}</span>

        <button
          className={styles.quantityButton}
          onClick={() => updateQuantity(quantity + 1)}
          disabled={!selectedSize || maxStock === 0 || quantity >= maxStock}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
