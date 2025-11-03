import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss, { type PluginOptions } from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss({
      theme: { extend: {} },
    } as PluginOptions),
    react(),
  ],
  base: '/',
  server: {
    port: 5173,
    open: true,
    fs: { strict: false },
    middlewareMode: false,
    // ✅ modern fallback syntax for Vite 7+
    // use "spaFallback" built-in middleware (under the hood of connect-history-api-fallback)
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 4173,
    open: true,
  },

})
