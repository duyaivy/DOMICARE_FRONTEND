import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
const globalShim = `globalThis.global = globalThis;`
export default defineConfig({
  server: {
    port: 4000,
    open: true
  },
  define: {
    global: 'globalThis'
  },
  esbuild: {
    banner: globalShim
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
