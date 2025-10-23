import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// ======================================================
// ⚙️ Cấu hình Vite SSR + React + Tailwind + Express
// ======================================================

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  build: {
    rollupOptions: {
      input: './index.html'
    },
    outDir: 'dist/client'
  },

  ssr: {
    noExternal: [
      'react-router-dom',
      // Externalize CommonJS packages that cause issues
      'sockjs-client',
      'socket.io-client',
      '@stomp/stompjs'
    ],
    external: ['express', 'vnpay', 'dotenv', 'compression', 'serve-static']
  },

  optimizeDeps: {
    exclude: ['vnpay'],
    include: ['sockjs-client', 'socket.io-client', '@stomp/stompjs']
  },

  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },

  server: {
    port: 3000,
    open: true,
    fs: {
      // Cho phép serve files từ thư mục utils
      allow: ['..']
    }
  },

  esbuild: {
    banner: 'globalThis.global = globalThis;'
  }
})
