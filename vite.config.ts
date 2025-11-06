import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [tailwindcss(), react()],
    
    // ✅ Use absolute paths
    base: '/',
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1600,
      sourcemap: mode !== 'production',
      
      // ✅ Optimized for webp
      assetsInlineLimit: 0, // Don't inline webp images (they're usually larger)
      
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['framer-motion', 'dayjs'],
            pdf: ['jspdf', 'qrcode']
          },
          // ✅ Webp-specific asset handling
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]'
            const isWebp = assetInfo.name.toLowerCase().endsWith('.webp')
            return isWebp 
              ? 'assets/images/[name]-[hash][extname]'
              : 'assets/[name]-[hash][extname]'
          }
        }
      }
    },

    server: {
      port: 5173,
      open: true,
    },

    preview: {
      port: 4173,
      open: true,
      host: true
    },
    
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENVIRONMENT || 'development'),
    }
  }
})