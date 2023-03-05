import { useSuspenseQuery_experimental as useSuspenseQuery } from '@apollo/client';

import type { GetFeatureItemsQueryResponse } from '../graphql/queries';
import { GetFeatureItemsQuery } from '../graphql/queries';

export const useFeatureItems = (featureId: number) => {
  const result = useSuspenseQuery<GetFeatureItemsQueryResponse>(GetFeatureItemsQuery, {
    variables: {
      featureId,
    },
  });

  return { items: result.data?.feature.items ?? [] };
};
