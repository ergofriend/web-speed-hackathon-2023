import { Temporal, toTemporalInstant } from '@js-temporal/polyfill';

if (typeof window !== 'undefined' && !('Temporal' in window)) {
  // @ts-expect-error polyfill
  window.Temporal = Temporal;
}

if (!('toTemporalInstant' in Date.prototype)) {
  // @ts-expect-error polyfill
  Date.prototype.toTemporalInstant = toTemporalInstant;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Temporal: typeof Temporal;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Date {
    toTemporalInstant: typeof toTemporalInstant;
  }
}
