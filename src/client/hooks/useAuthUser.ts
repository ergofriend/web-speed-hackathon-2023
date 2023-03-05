import { useQuery } from '@apollo/client/react/hooks';

import type { GetUserAuthQueryResponse } from '../graphql/queries';
import { GetAuthUserQuery } from '../graphql/queries';

export const useAuthUser = () => {
  const authUserResult = useQuery<GetUserAuthQueryResponse>(GetAuthUserQuery);
  const authUser = authUserResult.data?.me;
  const authUserLoading = authUserResult.loading;
  const isAuthUser = !!authUser;

  return { authUser, authUserLoading, isAuthUser };
};
