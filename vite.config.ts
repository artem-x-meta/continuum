import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (id.includes('node_modules/katex')) return 'katex';
          if (id.includes('node_modules/lucide-react')) return 'icons';
          if (id.includes('node_modules/react')) return 'react';
          if (normalized.includes('/src/data/en/')) return 'content-en';
          if (/\/src\/data\/(details|guides)-\d\.ts$/.test(normalized)) return 'content-ru';
          if (normalized.endsWith('/src/pages/lessonContent.tsx')) return 'lessons-ru';
          return undefined;
        },
      },
    },
  },
});
