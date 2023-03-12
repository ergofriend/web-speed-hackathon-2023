import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { SchemaLink } from '@apollo/client/link/schema';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { renderStylesToString } from '@emotion/server';
import type { GraphQLSchema } from 'graphql';
import { StaticRouter } from 'react-router-dom/server';
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router';

import { App } from '../client/components/application/App';

import type { PageContext } from './type';

export { render };
export { passToClient };

const passToClient = ['apolloInitialState', 'isMobile'];

async function render(pageContext: PageContextBuiltInClient & PageContext) {
  const { isMobile, Page, schema, urlPathname } = pageContext;
  const apolloClient = makeApolloClient(schema);

  // See https://www.apollographql.com/docs/react/performance/server-side-rendering/
  const tree = (
    <StaticRouter location={urlPathname}>
      <App apolloClient={apolloClient} isMobile={isMobile}>
        <Page />
      </App>
    </StaticRouter>
  );
  const pageHtml = await renderToStringWithData(tree);
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

function makeApolloClient(schema: GraphQLSchema) {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new SchemaLink({ schema }),
    ssrMode: true,
  });
  return apolloClient;
}
