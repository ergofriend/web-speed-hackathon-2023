import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { renderStylesToString } from '@emotion/server';
import { StaticRouter } from 'react-router-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router';

import { App } from '../client/components/application/App';

import type { PageContext } from './type';

export { render };
export { passToClient };

const passToClient = ['apolloInitialState', 'isMobile'];

async function render(pageContext: PageContextBuiltInClient & PageContext) {
  const { isMobile, Page, urlPathname } = pageContext;
  const apolloClient = makeApolloClient();

  // See https://www.apollographql.com/docs/react/performance/server-side-rendering/
  const tree = (
    <StaticRouter location={urlPathname}>
      <App apolloClient={apolloClient} isMobile={isMobile}>
        <Page />
      </App>
    </StaticRouter>
  );
  const pageHtml = await getDataFromTree(tree);
  const apolloInitialState = apolloClient.extract();
  const html = renderStylesToString(pageHtml);
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div id="page-content">${dangerouslySkipEscape(html)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      apolloInitialState,
      isMobile,
    },
  };
}

function makeApolloClient() {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      fetch,
      uri: 'http://127.0.0.1:8080/graphql',
    }),
    ssrMode: true,
  });
  return apolloClient;
}
