import { Navigate, Outlet, RouteObject, useLocation, useRoutes } from 'react-router-dom'
import { Fragment, ReactNode, useContext } from 'react'
import LayoutMain from '@/app/layout/LayoutMain'
import { path } from '@/core/constants/path'
import CustomerLayout from '@/app/layout/CustomerLayout'
import Login from '@/pages/ALL/login'
import Register from '@/pages/ALL/register'
import Dashboard from '@/pages/ADMIN/dashboard/Dashboard'
import PageNotFound from '@/pages/ALL/404/PageNotFound'
import { AppContext } from '@/core/contexts/app.context'
import Products from '@/pages/ALL/Products'
import { rolesCheck } from '@/utils/rolesCheck'
import ProfileAdmin from '@/pages/ADMIN/Settings/components/Profile.setting'
import Category from '@/pages/ADMIN/Manage/Category.manage'
import Product from '@/pages/ADMIN/Manage/Product.manage'
import Sale from '@/pages/ADMIN/Manage/Sale.manage'
import User from '@/pages/ADMIN/Manage/User.manage'
import ProductDetail from '@/pages/ALL/ProductDetail'
import Setting from '@/pages/ADMIN/Settings'
import SystemSetting from '@/pages/ADMIN/Settings/components/System.setting'
import Manage from '@/pages/ADMIN/Manage'
import HomePage from '@/pages/ALL/home'
import AboutUs from '@/pages/ALL/AboutUs'
import Profile from '@/pages/USER/Pages/Profile'
import UserLayout from '@/pages/USER/Layouts'
import ChangePassword from '@/pages/USER/Pages/ChangePassword'
import History from '@/pages/USER/Pages/History'
import AnimatedOutlet from '@/components/AnimatedOutlet'
import Report from '@/pages/ADMIN/Report'
import Post from '@/pages/ADMIN/Manage/Post.manage/Post'
import Settings from '@/pages/USER/Pages/Settings'

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
      path: '',
      element: <AnimatedOutlet />,
      children: [
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
              path: path._user,
              element: (
                <CustomerLayout>
                  <UserLayout />
                </CustomerLayout>
              ),
              children: [
                { path: path.user.profile, element: <Profile /> },
                { path: path.user.history, element: <History /> },
                { path: path.user.change_password, element: <ChangePassword /> },
                { path: path.user.settings, element: <Settings /> }
              ]
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
          path: '*',
          element: (
            <CustomerLayout>
              <PageNotFound />
            </CustomerLayout>
          )
        }
      ]
    },
    {
      path: path._admin,
      element: <ProtectedRouteAdmin />,
      children: [
        {
          path: path._admin,
          element: <LayoutMain />,
          children: [
            {
              path: path.admin.dashboard,
              element: <Dashboard />
            },
            {
              path: path.admin.report,
              element: <Report />
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
                },
                {
                  path: path.admin.manage.post,
                  element: <Post />
                }
              ]
            }
          ]
        }
      ]
    }
  ]

  const routeElements = useRoutes(routes, location)

  return <Fragment>{routeElements}</Fragment>
}
