import { useState } from 'react';
import styles from './ProductDetails.module.scss';
import { useProductDetailPageContext } from '../../stores/ProductDetails/useProductDetailContext';

const tabs = ['description', 'specifications', 'reviews'] as const;

type Tab = (typeof tabs)[number];

const specifications = [
  {
    label: 'Capacity',
    value: '65 Liters',
  },
  {
    label: 'Weight',
    value: '4.2 lbs',
  },
  {
    label: 'Material',
    value: '210D Ripstop Nylon',
  },
  {
    label: 'Waterproof Rating',
    value: 'IPX4',
  },
];
const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent backpack. Comfortable even on long hikes.',
  },
  {
    id: 2,
    name: 'Mark Peterson',
    rating: 4,
    comment: 'Great build quality and storage options.',
  },
  {
    id: 3,
    name: 'Emily Davis',
    rating: 5,
    comment: 'Used it on a 5-day trek and it performed perfectly.',
  },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [openAccordion, setOpenAccordion] = useState<Tab>('description');
  const { product } = useProductDetailPageContext();
  const renderContent = (tab: Tab) => {
    switch (tab) {
      case 'description':
        return (
          <div className={styles.description}>
            <p>{product?.description}</p>
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
