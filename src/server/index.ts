import http from 'node:http';
import { constants } from 'zlib';

import { koaMiddleware } from '@as-integrations/koa';
import gracefulShutdown from 'http-graceful-shutdown';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from 'koa-logger';
import route from 'koa-route';
import session from 'koa-session';
import serve from 'koa-static';
import MobileDetect from 'mobile-detect';
import { renderPage } from 'vite-plugin-ssr';

import type { Context } from './context';
import { dataSource } from './data_source';
import { initializeApolloServer } from './graphql';
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

  const apolloServer = await initializeApolloServer();
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

  app.use(serve(rootResolve('dist/client')));
  // const root = rootResolve('src')
  // const viteDevMiddleware = (
  //   await createServer({
  //     root,
  //     server: { middlewareMode: true }
  //   })
  // ).middlewares
  // app.use(c2k(viteDevMiddleware))

  app.use(serve(rootResolve('public')));
  app.use(
    compress({
      br: {
        flush: constants.BROTLI_OPERATION_FLUSH,
        params: {
          [constants.BROTLI_PARAM_QUALITY]: 5,
        },
      },
      deflate: {
        flush: constants.Z_SYNC_FLUSH,
      },
      gzip: {
        flush: constants.Z_SYNC_FLUSH,
      },
    }),
  );

  app.use(async (ctx, next) => {
    const md = new MobileDetect(ctx.request.headers['user-agent'] ?? '');
    const pageContextInit = {
      isMobile: md.phone() !== null,
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
