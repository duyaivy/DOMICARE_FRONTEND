# Domicare Frontend - SSR với Vite + React + VNPay

## ✨ Features

- ⚡️ **Vite SSR** - Server-Side Rendering với Vite
- ⚛️ **React 18** - Latest React with Suspense
- 🎨 **Tailwind CSS v4** - Modern styling
- 🔐 **VNPay Integration** - Payment gateway
- 📱 **Responsive Design** - Mobile-first approach
- 🌐 **i18n** - Multi-language support (EN/VI)
- 🎭 **Dark Mode** - Theme switching
- 📊 **React Query** - Data fetching & caching

## 🚀 Development

```bash
# Install dependencies
yarn install

# Start dev server (CSR mode for faster HMR)
yarn dev

# Open http://localhost:3000
```

## 🏗️ Build

```bash
# Build for production
yarn build

# Preview production build locally
yarn start
```

## 📦 Build Output

```
dist/
├── client/          # Client-side assets (Static files for CDN)
├── server/          # SSR bundle
│   ├── server.js    # Express server
│   └── entry-server.js  # React SSR entry
└── api/             # API routes (VNPay)
    └── vnpay.js     # VNPay payment handlers
```

## 🌍 Deploy to Vercel

### 1. Push code to GitHub

```bash
git add .
git commit -m "Setup SSR with VNPay"
git push origin main
```

### 2. Import project in Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the framework

### 3. Configure Environment Variables

Add these environment variables in Vercel dashboard:

```env
VITE_API_URL=your_backend_api_url
VITE_TMN_CODE=your_vnpay_tmn_code
VITE_SECURE_HASH=your_vnpay_secure_hash
VITE_VNP_RETURN_URL=https://your-domain.vercel.app/payment
```

### 4. Deploy

Click "Deploy" and wait for build to complete!

## 🔧 Important Files

### `vercel.json`
```json
{
  "version": 2,
  "buildCommand": "yarn build",
  "outputDirectory": "dist/client",
  "builds": [
    {
      "src": "dist/server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1"
    },
    {
      "src": "/api/(.*)",
      "dest": "dist/server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "dist/server/server.js"
    }
  ]
}
```

### `src/server.js`
- Main Express server
- VNPay API routes loaded BEFORE Vite middleware
- SSR enabled in production, CSR in development

### `api/vnpay.js`
- VNPay payment routes
- Located outside `src/` to avoid Vite processing
- Handles payment creation and callback

## 📝 Scripts

```json
{
  "dev": "Development server (CSR)",
  "build": "Build client + server + copy API files",
  "build:client": "Build client-side bundle",
  "build:server": "Build SSR bundle",
  "build:copy": "Copy API and server files to dist",
  "start": "Start production server"
}
```

## 🐛 Common Issues

### Issue: "No QueryClient set"
**Fix**: Make sure `entry-client.tsx` has all providers (QueryClient, Theme, i18n, etc.)

### Issue: "require is not defined"
**Fix**: Use dynamic imports for WebSocket packages (`sockjs-client`, `socket.io-client`)

### Issue: "Named export not found" (react-helmet-async)
**Fix**: Import as default then destructure:
```ts
import HelmetAsyncPkg from 'react-helmet-async'
const { HelmetProvider } = HelmetAsyncPkg as any
```

### Issue: VNPay routes not working
**Fix**: Ensure `api/vnpay.js` is loaded BEFORE Vite middleware in `server.js`

## 📚 Tech Stack

- **Framework**: React 18 + Vite 6
- **Routing**: React Router v7
- **State**: React Query + Zustand
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **i18n**: react-i18next
- **Payments**: VNPay SDK
- **Server**: Express.js

## 🎯 Performance

- ✅ SSR for SEO optimization
- ✅ Code splitting & lazy loading
- ✅ Optimized bundle size
- ✅ Fast HMR in development
- ✅ CDN-ready static assets

## 📄 License

MIT

---

**Made with ❤️ by Domicare Team**
