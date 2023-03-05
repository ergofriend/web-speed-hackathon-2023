import _ from 'lodash';
import type { FC } from 'react';
import { memo, Suspense } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { DummyProductGridList, ProductGridList } from '../ProductGridList';
import { DummyProductListSlider, ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = memo(({ featureSection }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return (
              <Suspense fallback={<DummyProductListSlider />}>
                <ProductListSlider featureSection={featureSection} />;
              </Suspense>
            );
          }
          case DeviceType.MOBILE: {
            return (
              <Suspense fallback={<DummyProductGridList />}>
                <ProductGridList featureSection={featureSection} />;
              </Suspense>
            );
          }
        }
      }}
    </GetDeviceType>
  );
}, _.isEqual);

ProductList.displayName = 'ProductList';

export const DummyProductList = () => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return <DummyProductListSlider />;
          }
          case DeviceType.MOBILE: {
            return <DummyProductGridList />;
          }
        }
      }}
    </GetDeviceType>
  );
};
