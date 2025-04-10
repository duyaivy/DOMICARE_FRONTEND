import { Navigate, Outlet, RouteObject, useLocation, useRoutes } from 'react-router-dom'
import { ReactNode, useContext } from 'react'
import LayoutMain from '@/app/layout/LayoutMain'

import { path } from '@/core/constants/path'
import { AnimatePresence, motion } from 'framer-motion'
import CustomerLayout from '@/app/layout/CustomerLayout'

import Login from '@/pages/ALL/login'
import Register from '@/pages/ALL/register'
import Dashboard from '@/pages/ADMIN/dashboard/Dashboard'
import PageNotFound from '@/pages/ALL/404/PageNotFound'
import HomePage from '@/pages/USER/home'
import AboutUs from '@/pages/USER/AboutUs'
import { AppContext } from '@/core/contexts/app.context'
import { ROLE_ADMIN, ROLE_USER } from '@/configs/consts'
import Profile from '@/pages/USER/Profile'

interface RouteConfig {
  path: string
  element: ReactNode
  children?: RouteObject[] | undefined
}
function ProtectedRouteAdmin() {
  //admin
  const { isAuthenticated, profile } = useContext(AppContext)
  if (profile?.roles && profile.roles[0] === ROLE_ADMIN && isAuthenticated) {
    return <Outlet />
  }
  return <Navigate to={path.login} />
}
function ProtectedRouteUser() {
  // user
  const { isAuthenticated, profile } = useContext(AppContext)
  if (profile?.roles && profile.roles[0] === ROLE_USER && isAuthenticated) {
    return <Outlet />
  }
  return <Navigate to={path.login} />
}
function RejectedRoute() {
  //login
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRoutesElements() {
  const location = useLocation()

  const routes: RouteConfig[] = [
    {
      path: path.home,
      element: (
        <CustomerLayout>
          <HomePage />
        </CustomerLayout>
      )
    },
    {
      path: path.aboutUs,
      element: (
        <CustomerLayout>
          <AboutUs />
        </CustomerLayout>
      )
    },

    {
      path: '',
      element: <ProtectedRouteUser />,
      children: [
        {
          path: path.profile,
          element: (
            <CustomerLayout>
              <Profile />
            </CustomerLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        { path: path.login, element: <Login /> },
        { path: path.register, element: <Register /> }
      ]
    },
    {
      path: '',
      element: <ProtectedRouteAdmin />,
      children: [
        {
          path: path.admin.dashboard,
          element: (
            <LayoutMain>
              <Dashboard />
            </LayoutMain>
          )
        }
      ]
    },
    {
      path: '*',
      element: (
        <CustomerLayout>
          <PageNotFound />
        </CustomerLayout>
      )
    }
  ]

  const routeElements = useRoutes(routes, location)
  const isAuthPath = [path.login, path.register].includes(location.pathname)

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={location.key}
        initial={{ opacity: 0, x: isAuthPath ? 20 : 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isAuthPath ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: isAuthPath ? 'absolute' : 'relative', width: '100%' }}
      >
        {routeElements}
      </motion.div>
    </AnimatePresence>
  )
}
