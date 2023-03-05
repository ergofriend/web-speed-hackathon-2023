import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { isMobileState } from '../../../store/modal/state';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

type Props = {
  children: ({ deviceType }: { deviceType: DeviceType }) => ReactNode;
};

export const GetDeviceType = ({ children }: Props) => {
  const isMobile = useRecoilValue(isMobileState);
  const [width] = useWindowSize();
  const deviceType = !isMobile || width > 768 ? DeviceType.DESKTOP : DeviceType.MOBILE;

  return <>{children({ deviceType })}</>;
};

const useWindowSize = (): number[] => {
  const init = typeof window !== 'undefined' ? [window.innerWidth, window.innerHeight] : [0, 0];
  const [size, setSize] = useState(init);
  useEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
