import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "categoryList",
    meta: {
      requiresAuth: false
    },
    component: () => import("../views/categoryList.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/categoryList",
    name: "categoryList",
    meta: {
      requiresAuth: false
    },
    component: () => import("../views/categoryList.vue")
  },
  {
    path: "/productList",
    name: "productList",
    meta: {
      requiresAuth: false
    },
    component: () => import("../views/productList.vue")
  },
  {
    path: "/createCategory",
    name: "createCategory",
    meta: {
      requiresAuth: false
    },
    component: () => import("../views/createCategory.vue")
  },
  {
    path: "/editProduct/:id",
    name: "editProduct",
    meta: {
      requiresAuth: false
    },
    component: () => import("../views/createProduct.vue")
  },
  {
    path: "/createProduct",
    name: "createProduct",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/createProduct.vue")
  },
  {
    path: "/editCategory/:id",
    name: "editCategory",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/createCategory.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
