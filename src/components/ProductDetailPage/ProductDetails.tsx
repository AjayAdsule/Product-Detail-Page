import { useState } from 'react';
import styles from './ProductDetails.module.scss';

interface ProductSpecification {
  label: string;
  value: string;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

interface ProductDetailsProps {
  description: string;
  specifications: ProductSpecification[];
  reviews: Review[];
}

const tabs = ['description', 'specifications', 'reviews'] as const;

type Tab = (typeof tabs)[number];

const ProductDetails = ({ description, specifications, reviews }: ProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [openAccordion, setOpenAccordion] = useState<Tab>('description');

  const renderContent = (tab: Tab) => {
    switch (tab) {
      case 'description':
        return (
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        );

      case 'specifications':
        return (
          <div className={styles.specs}>
            {specifications.map((spec) => (
              <div key={spec.label} className={styles.specRow}>
                <span>{spec.label}</span>
                <span>{spec.value}</span>
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className={styles.reviews}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <h4>{review.name}</h4>

                <div className={styles.rating}>{'★'.repeat(review.rating)}</div>

                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <section className={styles.details}>
      {/* Desktop */}

      <div className={styles.desktop}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.content}>{renderContent(activeTab)}</div>
      </div>

      {/* Mobile */}

      <div className={styles.mobile}>
        {tabs.map((tab) => (
          <div key={tab} className={styles.accordion}>
            <button
              className={styles.accordionHeader}
              onClick={() => setOpenAccordion(openAccordion === tab ? ('' as Tab) : tab)}
            >
              <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>

              <span>{openAccordion === tab ? '−' : '+'}</span>
            </button>

            {openAccordion === tab && (
              <div className={styles.accordionBody}>{renderContent(tab)}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
