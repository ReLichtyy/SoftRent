import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
  },
  plugins: [react(), tailwindcss()],
  build: {
    /* División de vendor: el núcleo de React, GSAP y los íconos se
     * cachean por separado del código de la app (iteración 4). */
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              name: 'vendor-react',
              test: /node_modules[\\/](react-dom|react-router|react\)|scheduler)/,
            },
            { name: 'vendor-gsap', test: /node_modules[\\/]gsap/ },
            {
              name: 'vendor-icons',
              test: /node_modules[\\/]@phosphor-icons/,
            },
          ],
        },
      },
    },
  },
})
