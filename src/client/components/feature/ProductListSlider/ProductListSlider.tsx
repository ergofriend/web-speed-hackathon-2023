import classNames from 'classnames';
import type { FC } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { useFeatureItems } from '../../../hooks/useFeatureItems';
import { DummyProductCard, ProductCard } from '../ProductCard';
import { ArrowType, ProductListSlideButton } from '../ProductListSlideButton';

import * as styles from './ProductListSlider.styles';
import { useSlider } from './hooks/useSlider';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductListSlider: FC<Props> = ({ featureSection }) => {
  const { items } = useFeatureItems(featureSection.id);
  const products = items.map((item) => item.product);

  const { containerElementRef, setSlideIndex, slideIndex, visibleItemCount } = useSlider({
    items: products,
  });

  return (
    <div className={styles.container()}>
      <div className={styles.slideButton()}>
        <ProductListSlideButton
          arrowType={ArrowType.LEFT}
          disabled={slideIndex === 0}
          onClick={() => setSlideIndex(slideIndex - visibleItemCount)}
        />
      </div>
      <div className={styles.listWrapper()}>
        <ul ref={containerElementRef} className={styles.list({ slideIndex, visibleItemCount })}>
          {products.map((product, index) => {
            const hidden = index < slideIndex || slideIndex + visibleItemCount <= index;
            return (
              <li
                key={product.id}
                className={classNames(styles.item(), {
                  [styles.item__hidden()]: hidden,
                })}
              >
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.slideButton()}>
        <ProductListSlideButton
          arrowType={ArrowType.RIGHT}
          disabled={slideIndex + visibleItemCount >= products.length}
          onClick={() => setSlideIndex(slideIndex + visibleItemCount)}
        />
      </div>
    </div>
  );
};

export const DummyProductListSlider = () => {
  // empty 10 items
  const products = Array.from({ length: 10 }, (_, index) => ({ id: index }));
  const { containerElementRef, setSlideIndex, slideIndex, visibleItemCount } = useSlider({
    items: products,
  });

  return (
    <div className={styles.container()}>
      <div className={styles.slideButton()}>
        <ProductListSlideButton
          arrowType={ArrowType.LEFT}
          disabled={slideIndex === 0}
          onClick={() => setSlideIndex(slideIndex - visibleItemCount)}
        />
      </div>
      <div className={styles.listWrapper()}>
        <ul ref={containerElementRef} className={styles.list({ slideIndex, visibleItemCount })}>
          {products.map((product, index) => {
            const hidden = index < slideIndex || slideIndex + visibleItemCount <= index;
            return (
              <li
                key={product.id}
                className={classNames(styles.item(), {
                  [styles.item__hidden()]: hidden,
                })}
              >
                <DummyProductCard />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.slideButton()}>
        <ProductListSlideButton
          arrowType={ArrowType.RIGHT}
          disabled={slideIndex + visibleItemCount >= products.length}
          onClick={() => setSlideIndex(slideIndex + visibleItemCount)}
        />
      </div>
    </div>
  );
};
