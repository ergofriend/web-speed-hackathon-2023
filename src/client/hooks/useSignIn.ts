import { useMutation } from '@apollo/client/react/hooks';

import { SignInMutation } from '../graphql/mutations';

export const useSignIn = () => {
  const [signIn] = useMutation(SignInMutation, {
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
    refetchQueries: ['GetAuthUser'],
  });

  return { signIn };
};
