import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'ghost' | 'icon';
type StockStatus = 'available' | 'low-stock' | 'sold-out';

interface ButtonProps {
  variant?: ButtonVariant;
  isActive?: boolean;
  stockStatus?: StockStatus;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const Button = ({
  variant = 'primary',
  isActive = false,
  stockStatus = 'available',
  disabled = false,
  onClick,
  children,
  type = 'button',
  ariaLabel,
}: ButtonProps) => {
  const classes = [
    styles.btn,
    styles[`btn--${variant}`],
    isActive && styles['btn--active'],
    stockStatus === 'low-stock' && styles['btn--low-stock'],
    stockStatus === 'sold-out' && styles['btn--sold-out'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || stockStatus === 'sold-out'}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
