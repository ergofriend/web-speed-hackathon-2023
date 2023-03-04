import type * as Sentry from '@sentry/node';
import type { Session } from 'koa-session';

export type Context = {
  session: Session;
  transaction: ReturnType<typeof Sentry.startTransaction>;
};
