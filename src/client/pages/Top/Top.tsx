import type { FC } from 'react';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import { DummyProductList, ProductList } from '../../components/feature/ProductList';
import { DummyProductHeroImage, ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

export const Top: FC = () => {
  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <Suspense fallback={<DummyProductHeroImage />}>
          <ProductHero />
        </Suspense>

        <div className={styles.featureList()}>
          <Suspense
            fallback={
              <>
                <DummyFeatureListItem />
                <DummyFeatureListItem />
                <DummyFeatureListItem />
                <DummyFeatureListItem />
              </>
            }
          >
            <FeatureList />
          </Suspense>
        </div>
      </Layout>
    </>
  );
};

const ProductHero = () => {
  const { recommendation } = useRecommendation();

  if (recommendation === undefined) {
    return null;
  }

  return <ProductHeroImage product={recommendation.product} title="今週のオススメ" />;
};

const FeatureList = () => {
  const { features } = useFeatures();

  if (features === undefined) {
    return null;
  }

  return (
    <>
      {features.map((featureSection) => {
        return (
          <div key={featureSection.id} className={styles.feature()}>
            <h2 className={styles.featureHeading()}>{featureSection.title}</h2>
            <ProductList featureSection={featureSection} />
          </div>
        );
      })}
    </>
  );
};

const DummyFeatureListItem = () => {
  return (
    <div className={styles.feature()}>
      <h2 className={styles.featureHeading()}>{''}</h2>
      <DummyProductList />
    </div>
  );
};
