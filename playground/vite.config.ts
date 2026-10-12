import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: here,
  plugins: [react(), tailwindcss()],
  server: { port: 5199, strictPort: false },
  build: {
    outDir: path.resolve(here, '../dist/playground'),
    emptyOutDir: true,
  },
});
