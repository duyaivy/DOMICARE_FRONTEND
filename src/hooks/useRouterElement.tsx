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

import { AppContext } from '@/core/contexts/app.context'

import Profile from '@/pages/USER/Profile'
import Products from '@/pages/ALL/Products'
import { rolesCheck } from '@/utils/rolesCheck'
import ProfileAdmin from '@/pages/ADMIN/Settings/Profile.setting'
import Category from '@/pages/ADMIN/Manage/Category.manage'
import Product from '@/pages/ADMIN/Manage/Product.manage'
import Sale from '@/pages/ADMIN/Manage/Sale.manage'
import User from '@/pages/ADMIN/Manage/User.manage'
import ProductDetail from '@/pages/ALL/ProductDetail'
import Setting from '@/pages/ADMIN/Settings'
import SystemSetting from '@/pages/ADMIN/Settings/System.setting'
import Manage from '@/pages/ADMIN/Manage'
import HomePage from '@/pages/ALL/home'
import AboutUs from '@/pages/ALL/AboutUs'

interface RouteConfig {
  path: string
  element: ReactNode
  children?: RouteObject[] | undefined
}
function ProtectedRouteAdmin() {
  //admin
  const { isAuthenticated, profile } = useContext(AppContext)
  if (profile?.roles && rolesCheck.isAdminOrSale(profile.roles) && isAuthenticated) {
    return <Outlet />
  }
  return <Navigate to={path.login} />
}
function ProtectedRouteUser() {
  // user
  const { isAuthenticated, profile } = useContext(AppContext)
  if (profile?.roles && rolesCheck.isUser(profile.roles) && isAuthenticated) {
    return <Outlet />
  }
  return <Navigate to={path.login} />
}
function RejectedRoute() {
  //login
  const { isAuthenticated, profile } = useContext(AppContext)
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={rolesCheck.isAdminOrSale(profile?.roles || []) ? path.admin.dashboard : path.home} />
  )
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
      path: path.products,
      element: (
        <CustomerLayout>
          <Products />
        </CustomerLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <CustomerLayout>
          <ProductDetail />
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
          path: path._admin,
          element: (
            <LayoutMain>
              <Outlet />
            </LayoutMain>
          ),
          children: [
            {
              path: path.admin.dashboard,
              element: <Dashboard />
            },
            {
              path: path.admin._setting,
              element: <Setting />,
              children: [
                {
                  path: path.admin.setting.profile,
                  element: <ProfileAdmin />
                },
                {
                  path: path.admin.setting.system,
                  element: <SystemSetting />
                }
              ]
            },
            {
              path: path.admin._manage,
              element: <Manage />,
              children: [
                {
                  path: path.admin.manage.category,
                  element: <Category />
                },
                {
                  path: path.admin.manage.product,
                  element: <Product />
                },
                {
                  path: path.admin.manage.user,
                  element: <User />
                },
                {
                  path: path.admin.manage.sale,
                  element: <Sale />
                }
              ]
            }
          ]
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
