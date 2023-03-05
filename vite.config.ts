import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
// import { ViteEjsPlugin } from 'vite-plugin-ejs';
import ssr from 'vite-plugin-ssr/plugin';
// import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig(async () => {
  return {
    // build: {
    //   minify: true,
    //   rollupOptions: {
    //     plugins: [visualizer()],
    //   },
    //   target: 'es2020',
    // },
    plugins: [
      react(),
      ssr(),
      // topLevelAwait(),
      // ViteEjsPlugin({
      //   module: '/src/client/index.tsx',
      //   title: '買えるオーガニック',
      // }),
    ],
  };
});
