export default [{
  path: '/',
  name: 'Home',
  component: () =>
      import ( /* webpackChunkName: "about" */ '../views/Homepage.vue')
},
{
  path: '/home',
  name: 'Home',
  component: () =>
      import ( /* webpackChunkName: "about" */ '../views/Homepage.vue')
},

]