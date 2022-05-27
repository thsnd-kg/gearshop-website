export default [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Homepage.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Homepage.vue")
  },
  {
    path: "/product/:link",
    name: "Product Detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductDetail.vue")
  }
];