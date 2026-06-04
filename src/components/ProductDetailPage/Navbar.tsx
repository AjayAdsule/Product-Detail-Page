import { useProductDetailPageContext } from '../../stores/ProductDetails/useProductDetailContext';
import styles from './Navbar.module.scss';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const { cart } = useProductDetailPageContext();

  const cartCount = cart.reduce(
    (total: number, item: { quantity: number }) => total + item.quantity,
    0
  );
  return (
    <header className={styles.navbar}>
      <div className="container">
        <div className={styles.navbarContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon} />
            <span>SummitX</span>
          </div>

          <nav className={styles.navigation}>
            <a href="#">Gear</a>
            <a href="#">Apparel</a>
            <a href="#">Footwear</a>
            <a href="#">Sale</a>
          </nav>

          <div className={styles.actions}>
            <button className={styles.cartButton}>
              <ShoppingCart size={22} />
              {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
            </button>

            <button className={styles.iconButton}>
              <User size={22} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
