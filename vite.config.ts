import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [tailwindcss(), react()],
    
    // ✅ CRITICAL FIX: Use absolute path for GitHub Pages
    base: mode === 'production' ? '/' : '/',
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1600,
      sourcemap: mode !== 'production',
      
      // ✅ Optimized for assets
      assetsInlineLimit: 8192,
      
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['framer-motion', 'dayjs'],
            pdf: ['jspdf', 'qrcode']
          },
          // ✅ Proper asset handling
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]'
            const ext = assetInfo.name.split('.').pop()?.toLowerCase() || ''
            
            if (/png|jpe?g|gif|svg|webp|ico/i.test(ext)) {
              return 'assets/images/[name]-[hash][extname]'
            }
            if (/mp4|webm|ogg/i.test(ext)) {
              return 'assets/videos/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
          // ✅ Ensure proper MIME types
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
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