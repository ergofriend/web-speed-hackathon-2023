import type { FC } from 'react';
import { lazy, Suspense } from 'react';

import { Providers } from '../Providers';
import { Routes } from '../Routes';

const SignInModal = lazy(() => import('../../modal/SignInModal'));
const SignUpModal = lazy(() => import('../../modal/SignUpModal'));

export const App: FC = () => (
  <Providers>
    <Suspense fallback={null}>
      <Routes />
    </Suspense>
    <Suspense fallback={null}>
      <SignInModal />
      <SignUpModal />
    </Suspense>
  </Providers>
);
