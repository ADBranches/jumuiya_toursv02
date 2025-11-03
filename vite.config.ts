import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss, { type PluginOptions } from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss({
      theme: { extend: {} },
    } as PluginOptions),
    react(),
  ],
  base: '/',
})
