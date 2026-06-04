import { useState, useRef } from 'react';
import styles from './ImageGallery.module.scss';

const productImages = [
  {
    src: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: '1image',
  },
  {
    src: 'https://images.unsplash.com/photo-1622260614927-208cfe3f5cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'second',
  },
  {
    src: 'https://images.unsplash.com/photo-1570630358718-4fb324824b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'third',
  },
  {
    src: 'https://images.unsplash.com/photo-1622260615656-96d7c7ad6c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'third',
  },
  {
    src: 'https://images.unsplash.com/photo-1770563182591-892c3180f66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxoaWtpbmclMjBiYWNrcGFjayUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzgwMzg0MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'four',
  },
];

const ImageGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  if (!productImages.length) return null;

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);

    const container = thumbnailsRef.current;
    if (!container) return;
    const thumb = container.children[index] as HTMLElement;
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <img
          src={productImages[activeIndex].src}
          alt={productImages[activeIndex].alt}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.thumbnails} ref={thumbnailsRef}>
        {productImages.map((image, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${activeIndex === index ? styles.thumbnailActive : ''}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image.src} alt={image.alt} className={styles.thumbnailImage} loading="lazy" />
          </button>
        ))}
      </div>

      <div className={styles.dots}>
        {productImages.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${activeIndex === index ? styles.dotActive : ''}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
