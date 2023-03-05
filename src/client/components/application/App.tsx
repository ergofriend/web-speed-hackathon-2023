import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react/context';
import type { FC, ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { MutableSnapshot } from 'recoil';
import { RecoilRoot } from 'recoil';

import { injectGlobalStyle } from '../../global.styles';
import { Fallback } from '../../pages/Fallback';
import { isMobileState } from '../../store/modal/state';

import '../../polyfill/install';

injectGlobalStyle();

const SignInModal = lazy(() => import('../modal/SignInModal'));
const SignUpModal = lazy(() => import('../modal/SignUpModal'));

type Props = {
  isMobile: boolean;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  children: ReactNode;
};

export const App: FC<Props> = ({ apolloClient, children, isMobile }) => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(isMobileState, isMobile);
  };

  return (
      <ApolloProvider client={apolloClient}>
        <RecoilRoot initializeState={initializeState}>
          <ErrorBoundary fallbackRender={Fallback}>{children}</ErrorBoundary>
          <Suspense fallback={null}>
            {/* <SignInModal />
            <SignUpModal /> */}
          </Suspense>
        </RecoilRoot>
      </ApolloProvider>
  );
};
