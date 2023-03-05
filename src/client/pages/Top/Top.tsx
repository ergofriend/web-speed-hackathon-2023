import { FC, useEffect, useState } from 'react';
import { Suspense } from 'react';
import { Helmet } from 'react-helmet';

import { Layout } from '../../components/application/Layout';
import {  ProductList } from '../../components/feature/ProductList';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useFeatures } from '../../hooks/useFeatures';
import { useRecommendation } from '../../hooks/useRecommendation';

import * as styles from './Top.styles';

export const Top: FC = () => {
  useEffect(() => {
    console.log('Top');
  }, []);
  return (
    <>
      <Helmet>
        <title>買えるオーガニック</title>
      </Helmet>
      <Layout>
        <ProductHero />
        <div className={styles.featureList()}>
        <FeatureList />
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


