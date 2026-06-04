import styles from './color.module.scss';
import { Route as ProductRoute } from './../../routes/product/$productId';
import type { ProductColor } from '../../types/product';

const Colors = ({ colors }: { colors: ProductColor[] }) => {
  const navigate = ProductRoute.useNavigate();
  const { selectedColor } = ProductRoute.useSearch();
  console.log({ colors });

  const handleColorSelect = (colorName: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        selectedColor: colorName,
        selectedSize: undefined,
      }),
    });
  };

  return (
    <div className={styles.colorSection}>
      <p className={styles.sectionLabel}>
        Color: <span>{selectedColor}</span>
      </p>

      <div className={styles.swatches}>
        {colors?.map((color) => (
          <button
            key={color.name}
            className={`${styles.swatch} ${
              selectedColor === color.name ? styles.swatchActive : ''
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleColorSelect(color.name)}
            aria-label={`Select ${color.name}`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Colors;
