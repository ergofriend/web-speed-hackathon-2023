export { render };

import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router';

import { App } from '../client/components/application/App';

import type { PageContext } from './type';

async function render(pageContext: PageContextBuiltInClient & PageContext) {
  const { apolloInitialState, isMobile, Page } = pageContext;
  const apolloClient = makeApolloClient(apolloInitialState);
  hydrateRoot(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('page-content')!,
    <BrowserRouter>
      <App apolloClient={apolloClient} isMobile={isMobile}>
        <Page />
      </App>
    </BrowserRouter>,
    {
      onRecoverableError: (error) => {
        console.error('hydrateRoot onRecoverableError', error);
      },
    },
  );
}

function makeApolloClient(apolloInitialState?: NormalizedCacheObject) {
  return new ApolloClient({
    cache: apolloInitialState ? new InMemoryCache().restore(apolloInitialState) : new InMemoryCache(),
    uri: '/graphql',
  });
}
