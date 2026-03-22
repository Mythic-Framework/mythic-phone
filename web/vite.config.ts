import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  // Pre-bundle every dependency that is only reachable via lazy-loaded app
  // chunks. Without this, Vite discovers them at runtime, re-optimises, and
  // forces a full page reload the first time each app is opened.
  optimizeDeps: {
    include: [
      'math-expression-evaluator',
      'lodash',
      'html-react-parser',
      // Keep the rest here so they are never discovered late either
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      '@reduxjs/toolkit',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      '@mui/styles',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/react-fontawesome',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      'date-fns',
      'moment',
      'moment-timezone',
      'dompurify',
      'react-quill',
      'react-player',
      'react-number-format',
      'react-transition-group',
      'styled-components',
      'bad-words',
      '@uiw/react-color-sketch',
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-redux', 'redux', 'redux-thunk'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'fontawesome-core': ['@fortawesome/fontawesome-svg-core', '@fortawesome/react-fontawesome'],
          'fontawesome-icons': [
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-regular-svg-icons',
          ],
          router: ['react-router-dom'],
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'App': path.resolve(__dirname, './src/App'),
      'Apps': path.resolve(__dirname, './src/Apps'),
      'components': path.resolve(__dirname, './src/components'),
      'containers': path.resolve(__dirname, './src/containers'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'util': path.resolve(__dirname, './src/util'),
      'dataReducer': path.resolve(__dirname, './src/dataReducer'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
});
