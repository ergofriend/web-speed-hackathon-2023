import type { FC } from 'react';
import { Suspense } from 'react';

import { SignInModal } from '../../modal/SignInModal';
import { SignUpModal } from '../../modal/SignUpModal';
import { Providers } from '../Providers';
import { Routes } from '../Routes';

export const App: FC = () => (
  <Providers>
    <Suspense fallback={null}>
      <Routes />
    </Suspense>
    <SignInModal />
    <SignUpModal />
  </Providers>
);
