import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(async () => {
  return {
    build: {
      minify: true,
      rollupOptions: {
        plugins: [visualizer()],
      },
    },
    plugins: [
      react(),
      topLevelAwait(),
      ViteEjsPlugin({
        module: '/src/client/index.tsx',
        title: '買えるオーガニック',
      }),
    ],
  };
});
