export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  aboutUs: '/about-us',
  products: '/products',
  product: '/product',
  productDetail: '/product/:id',

  blog: '/blog',
  buy: '/buy',
  recuitment: '/recuitment',
  _admin: '/admin',
  admin: {
    dashboard: '/admin/dashboard',
    report: 'admin/report',
    _manage: '/admin/manage',
    manage: {
      user: '/admin/manage/user',
      sale: '/admin/manage/sale',
      category: '/admin/manage/category',
      product: '/admin/manage/product'
    },
    _setting: '/admin/setting',
    setting: {
      profile: '/admin/setting/profile',
      system: '/admin/setting/system'
    }
  },
  _user: '/user',
  user: {
    profile: '/user/profile',
    history: '/user/history',
    change_password: '/user/change_password'
  }
}
