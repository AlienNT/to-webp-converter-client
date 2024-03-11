import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import autoprefixer from "autoprefixer";
import path from "node:path";
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/css/variables.scss";`,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})
