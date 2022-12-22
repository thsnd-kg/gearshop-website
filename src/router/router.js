/** @format */

export default [
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue')
  },
  {
    path: '/checkout',
    name: 'CheckOut',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CheckOut.vue')
  },
  {
    path: '/tai-khoan/:url',
    name: 'profile',

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ProfileView.vue')
  },
  {
    path: '/my-orders',
    name: 'Orders',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/MyOrders.vue')
  },
  {
    path: '/brands/:link',
    name: 'ProductByBrand',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ProductByBrands.vue')
  },
  {
    path: '/:link',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Homepage.vue')
  },
  { path: '/', redirect: '/laptop' },

  {
    path: '/product/:link',
    name: 'Product Detail',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ProductDetail.vue')
  },

  {
    path: '/xac-thuc/quen-mat-khau',
    name: 'ForgotPassword',

    component: () => import('../views/auth-page/ForgotPassword.vue')
  },
  {
    path: '/xac-thuc/xac-nhan-email',
    name: 'MailConfirmation',

    component: () => import('../views/auth-page/MailConfirmation.vue')
  },

  {
    path: '/payment/success',
    name: 'SuccessPayment',

    component: () => import('../views/payment-page/Success.vue')
  },
  {
    path: '/payment/failure',
    name: 'FailurePayment',

    component: () => import('../views/payment-page/Failure.vue')
  },
  {
    name: 'ErrorPage',
    path: '/:pathMatch(.*)*',

    component: () => import('../views/static-page/ErrorPage.vue')
  }
];
