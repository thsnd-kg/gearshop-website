export default [
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
  }
];