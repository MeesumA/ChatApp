import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      inject: {
        inject: {
          inject: {
            inject: '<script type="module" src="/src/main.ts"></script>',
          },
        },
      },
    }),
  ],
  server: {
    port: 4200, // Default Angular port
  },
  build1: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/main.ts',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
