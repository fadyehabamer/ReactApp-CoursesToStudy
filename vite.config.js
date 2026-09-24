/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // Same output folder as Create React App, so the Vercel project's
    // "Output Directory" (build) keeps working.
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    // describe/test/expect/vi as globals, like Jest; also lets Testing
    // Library clean up the DOM after each test automatically.
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
