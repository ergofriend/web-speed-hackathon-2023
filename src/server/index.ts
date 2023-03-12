import http from 'node:http';

import { koaMiddleware } from '@as-integrations/koa';
import gracefulShutdown from 'http-graceful-shutdown';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import c2k from 'koa-connect';
import logger from 'koa-logger';
import route from 'koa-route';
import session from 'koa-session';
import serve from 'koa-static';
import MobileDetect from 'mobile-detect';
import { renderPage } from 'vite-plugin-ssr';

import type { Context } from './context';
import { dataSource } from './data_source';
import { initializeApolloServer } from './graphql';
import { root } from './root';
import { getTransaction, initSentry } from './sentry';
import { initializeDatabase } from './utils/initialize_database';
import { rootResolve } from './utils/root_resolve';

const PORT = Number(process.env.PORT ?? 8080);

async function init(): Promise<void> {
  await initializeDatabase();
  await dataSource.initialize();

  const app = new Koa();
  const httpServer = http.createServer(app.callback());

  initSentry();

  app.keys = ['cookie-key'];
  app.use(logger());
  app.use(bodyParser());
  app.use(session({}, app));

  // dist/client にすると mine/type エラーになる
  // app.use(serve(rootResolve('dist/client'), { maxAge: 1000 * 60 * 1 })); // 1 minute
  const vite = await import('vite');
  const viteDevMiddleware = (
    await vite.createServer({
      root,
      server: { middlewareMode: true },
    })
  ).middlewares;

  app.use(c2k(viteDevMiddleware));

  app.use(serve(rootResolve('public'), { maxAge: 1000 * 60 * 60 * 24 })); // 24 hour

  const { schema, server: apolloServer } = await initializeApolloServer();
  await apolloServer.start();

  app.use(
    route.all(
      '/graphql',
      koaMiddleware(apolloServer, {
        context: async ({ ctx }) => {
          const transaction = getTransaction();
          const context = { session: ctx.session, transaction };
          return context as Context;
        },
      }),
    ),
  );

  app.use(
    route.post('/initialize', async (ctx) => {
      await initializeDatabase();
      ctx.status = 204;
    }),
  );

  app.use(async (ctx, next) => {
    console.log('rendering', ctx.originalUrl);
    const md = new MobileDetect(ctx.request.headers['user-agent'] ?? '');
    const pageContextInit = {
      isMobile: md.phone() !== null,
      schema,
      urlOriginal: ctx.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);

    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, contentType, statusCode } = httpResponse;

    console.log(`Sending ${ctx.originalUrl}: ${statusCode} ${contentType}`);

    ctx.status = statusCode;
    ctx.type = contentType;
    ctx.body = body;
  });

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });

  gracefulShutdown(httpServer, {
    async onShutdown(signal) {
      console.log(`Received signal to terminate: ${signal}`);
      await apolloServer.stop();
      await dataSource.destroy();
    },
  });
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
