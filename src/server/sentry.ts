/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ApolloServerPlugin } from '@apollo/server';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';

import type { Context } from './context';

export const initSentry = () => {
  // If you want to use `@sentry/tracing` in your project directly, use a named import instead:
  // import * as SentryTracing from "@sentry/tracing"
  // Unused named imports are not guaranteed to patch the global hub.
  Sentry.init({
    dsn: 'https://8d493e24275f4bdab9aac2196e6e6cd9@o1213069.ingest.sentry.io/4504778077044736',

    integrations: [new Integrations.Apollo()],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1,
  });
};

export const getTransaction = () => {
  // ... create other context fields
  const transaction = Sentry.startTransaction({
    name: 'GraphQLTransaction',
    op: 'gql', // this will be the default name, unless the gql query has a name
  });
  return transaction;
};

export const apolloTracingPlugin: ApolloServerPlugin<Context> = {
  // @ts-ignore
  requestDidStart({ contextValue: context, request }) {
    if (request.operationName) {
      // set the transaction Name if we have named queries
      context.transaction.setName(request.operationName!);
    }
    return {
      executionDidStart() {
        return {
          // @ts-ignore
          willResolveField({ contextValue: context, info }) {
            // hook for each new resolver
            const span = context.transaction.startChild({
              description: `${info.parentType.name}.${info.fieldName}`,
              op: 'resolver',
            });
            return () => {
              // this will execute once the resolver is finished
              span.finish();
            };
          },
        };
      },
      // @ts-ignore
      willSendResponse({ contextValue: context }) {
        // hook for transaction finished
        context.transaction.finish();
      },
    };
  },
};
