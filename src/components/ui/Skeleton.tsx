import styles from './skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  circle?: boolean;
  className?: string;
}

const Skeleton = ({
  width = '100%',
  height = '20px',
  circle = false,
  className = '',
}: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius: circle ? '50%' : '6px',
      }}
    />
  );
};

export default Skeleton;
