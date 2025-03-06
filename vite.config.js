import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://appointmentbookingapi-production.up.railway.app', // A backend API URL-je
        changeOrigin: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        rewrite: (path) => path.replace(/^\/api/, ''), // Ha szükséges, hogy az '/api' eltűnjön a requestből
      },
    },
  }
  
  
})