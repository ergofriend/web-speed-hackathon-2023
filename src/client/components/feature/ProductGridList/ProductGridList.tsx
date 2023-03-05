import type { FC } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { useFeatureItems } from '../../../hooks/useFeatureItems';
import { DummyProductCard, ProductCard } from '../ProductCard';

import * as styles from './ProductGridList.styles';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductGridList: FC<Props> = ({ featureSection }) => {
  const { items } = useFeatureItems(featureSection.id);
  const products = items.map((item) => item.product);

  return (
    <ul className={styles.cardList()}>
      {products.map((product) => {
        return (
          <li key={product.id} className={styles.cardListItem()}>
            <ProductCard product={product} />
          </li>
        );
      })}
    </ul>
  );
};

export const DummyProductGridList = () => {
  // empty 10 items
  const products = Array.from({ length: 10 }, (_, index) => ({ id: index }));
  return (
    <ul className={styles.cardList()}>
      {products.map((product) => {
        return (
          <li key={product.id} className={styles.cardListItem()}>
            <DummyProductCard />
          </li>
        );
      })}
    </ul>
  );
};
