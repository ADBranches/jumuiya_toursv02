import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  
  // ✅ Use "./" for GitHub Pages or any static hosting (custom domains included)
  base: './',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
  },

  server: {
    port: 5173,
    open: true,
  },

  preview: {
    port: 4173,
    open: true,
  },
})
