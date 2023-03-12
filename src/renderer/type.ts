import type { NormalizedCacheObject } from '@apollo/client';
import type { GraphQLSchema } from 'graphql';

export type PageContext = {
  isMobile: boolean;
  emotionIds: string[];
  apolloInitialState: NormalizedCacheObject | undefined;
  urlOriginal: string;
  urlPathname: string;
  schema: GraphQLSchema;
};
