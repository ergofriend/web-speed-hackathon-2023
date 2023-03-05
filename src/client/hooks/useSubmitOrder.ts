import { useMutation } from '@apollo/client/react/hooks';
import { useErrorHandler } from 'react-error-boundary';

import type { OrderItemsInShoppingCartMutationResponse } from '../graphql/mutations';
import { OrderItemsInShoppingCartMutation } from '../graphql/mutations';

export const useSubmitOrder = () => {
  const handleError = useErrorHandler();
  const [submitOrder] = useMutation<OrderItemsInShoppingCartMutationResponse>(OrderItemsInShoppingCartMutation, {
    onError: handleError,
    onQueryUpdated(observableQuery) {
      return observableQuery.refetch();
    },
    refetchQueries: ['GetAuthUser'],
  });

  return { submitOrder };
};
