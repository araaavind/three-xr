import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    port: 8080,
    hot: true
  },
  build: {
    outDir: resolve(__dirname, 'dist/'),
    rollupOptions: {
      input: [
        resolve(__dirname, 'src/index.html'),
        resolve(__dirname, 'src/birthday/index.html'),
        resolve(__dirname, 'src/404/index.html'),
        resolve(__dirname, 'src/admin/index.html'),
        resolve(__dirname, 'src/admin/login.html'),
        resolve(__dirname, 'src/admin/signup.html'),
      ]
    }
  }
});
