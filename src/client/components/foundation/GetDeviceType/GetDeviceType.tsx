import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

export const DeviceType = {
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
} as const;
export type DeviceType = typeof DeviceType[keyof typeof DeviceType];

type Props = {
  children: ({ deviceType }: { deviceType: DeviceType }) => ReactNode;
};

export const GetDeviceType = ({ children }: Props) => {
  const [width] = useWindowSize();
  const deviceType = width > 768 ? DeviceType.DESKTOP : DeviceType.MOBILE;

  return <>{children({ deviceType })}</>;
};

const useWindowSize = (): number[] => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
