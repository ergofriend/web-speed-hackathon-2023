import { useMutation } from '@apollo/client/react/hooks';

import { SignUpMutation } from '../graphql/mutations';

export const useSignUp = () => {
  const [signUp] = useMutation(SignUpMutation, {
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
    refetchQueries: ['GetAuthUser'],
  });

  return { signUp };
};
