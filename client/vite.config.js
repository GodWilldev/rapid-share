import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias     : {
      '@src'        : path.resolve('./src'),
      '@styles'     : path.resolve('./src/styles'),
      '@components' : path.resolve('./src/components'),
      '@assets'     : path.resolve('./src/assets'),
    }
  }
})
