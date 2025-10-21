import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
const globalShim = `globalThis.global = globalThis;`
export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  define: {
    global: 'globalThis'
  },
  esbuild: {
    banner: globalShim
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
