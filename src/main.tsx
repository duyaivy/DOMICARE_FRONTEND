import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/sonner.tsx'
import { AppProvider } from './core/contexts/app.context.tsx'
import ScrollToTop from './app/layout/ScrollToTop.tsx'
import config from './configs/index.ts'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import i18n from './core/configs/i18n.ts'
import ErrorBoundary from './components/ErrorBoundary'

const clientAPI = config.googleId
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={clientAPI}>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
              <ThemeProvider>
                <ScrollToTop>
                  <I18nextProvider i18n={i18n}>
                    <AppProvider>
                      <App />
                    </AppProvider>
                  </I18nextProvider>
                </ScrollToTop>
              </ThemeProvider>
            </HelmetProvider>
            <Toaster richColors closeButton />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </StrictMode>
  </ErrorBoundary>
)
