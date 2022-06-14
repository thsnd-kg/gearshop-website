export default [
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cart.vue")
  },
  {
    path: "/checkout",
    name: "CheckOut",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CheckOut.vue")
  },
  {
    path: "/my-orders",
    name: "Orders",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MyOrders.vue")
  },
  {
    path: "/brands/:link",
    name: "ProductByBrand",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductByBrands.vue")
  },
  {
    path: "/:link",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Homepage.vue")
  },
  { path: "",  redirect: '/laptop'  },
  { path: '*', redirect: '/laptop' },
  {
    path: "/product/:link",
    name: "Product Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductDetail.vue")
  },
  
];