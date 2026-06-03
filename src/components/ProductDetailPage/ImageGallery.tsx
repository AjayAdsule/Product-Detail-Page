import { useState, useRef } from 'react';
import styles from './ImageGallery.module.scss';

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  if (!images.length) return null;

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
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className={styles.mainImage}
        />
      </div>

      <div className={styles.thumbnails} ref={thumbnailsRef}>
        {images.map((image, index) => (
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
        {images.map((_, index) => (
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
