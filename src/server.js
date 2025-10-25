import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isProd = process.env.NODE_ENV === 'production'

async function startServer() {
  const app = express()
  app.use(express.json())

  try {
    const apiDir = isProd ? path.resolve(__dirname, '../api') : path.resolve(__dirname, '../api')
    const vnpayPath = path.join(apiDir, 'vnpay.js')

    // Convert Windows path to file:// URL
    const vnpayUrl = new URL(`file:///${vnpayPath.replace(/\\/g, '/')}`).href
    const { default: vnpayRouter } = await import(vnpayUrl)
    app.use('/api', vnpayRouter)
    console.log('✅ VNPay router loaded successfully from:', vnpayPath)
  } catch (err) {
    console.error('⚠️ Không thể load module vnpay.js:', err)
  }

  let vite
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import('compression')).default
    const serveStatic = (await import('serve-static')).default
    app.use(compression())
    app.use(serveStatic(path.resolve(__dirname, '../client'), { index: false }))
  }

  app.use(async (req, res, next) => {
    if (req.url.startsWith('/api')) return next()

    try {
      const url = req.originalUrl
      const root = path.resolve(__dirname, '..')

      const templatePath = isProd ? path.join(root, 'client/index.html') : path.join(root, 'index.html')

      let template = fs.readFileSync(templatePath, 'utf-8')

      if (!isProd && vite) {
        template = await vite.transformIndexHtml(url, template)
      }

      if (isProd) {
        try {
          const render = (await import('./entry-server.js')).render
          const appHtml = await render(url)
          const html = template.replace('<!--app-html-->', appHtml)
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (ssrError) {
          console.warn('⚠️ SSR failed, using CSR:', ssrError.message)
          const html = template.replace('<!--app-html-->', '<div id="root"></div>')
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        }
      } else {
        const html = template.replace('<!--app-html-->', '<div id="root"></div>')
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      }
    } catch (err) {
      !isProd && vite?.ssrFixStacktrace(err)
      console.error('❌ Server Error:', err)
      res.status(500).end('Internal Server Error')
    }
  })

  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
  })
}

startServer().catch((err) => {
  console.error('💥 Failed to start server:', err)
})
