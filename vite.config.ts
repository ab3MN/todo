import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['node_modules', 'dist'],
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env,
    },
    build: {
      sourcemap: true,
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
    },
  });
};
