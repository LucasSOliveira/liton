import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import svgLoader from 'vite-svg-loader'
// https://vite.dev/config/

const setAlias = (dir: string) => path.resolve(__dirname, dir);

export default defineConfig({
  plugins: [vue(), tailwindcss(), svgLoader()],
  resolve: {
    alias: {
      '@': setAlias('src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    },
  },
})
