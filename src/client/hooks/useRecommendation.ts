import { useQuery } from '@apollo/client/react/hooks';

import type { GetRecommendationsQueryResponse } from '../graphql/queries';
import { GetRecommendationsQuery } from '../graphql/queries';

export const useRecommendation = () => {
  const recommendationsResult = useQuery<GetRecommendationsQueryResponse>(GetRecommendationsQuery);

  const hour = typeof window !== 'undefined' && window.Temporal ? window.Temporal.Now.plainTimeISO().hour : 0;
  const recommendations = recommendationsResult?.data?.recommendations;

  if (recommendations == null) {
    return { recommendation: undefined };
  }

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation };
};
