import type { NormalizedCacheObject } from '@apollo/client';

export type PageContext = {
  isMobile: boolean;
  emotionIds: string[];
  apolloInitialState: NormalizedCacheObject | undefined;
  urlOriginal: string;
  urlPathname: string;
};
