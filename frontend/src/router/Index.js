import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Create from "../views/Create.vue";
import Edit from "../views/Edit.vue";
import Home from "../views/Home.vue";
import { isAuthenticated } from "../utils/auth";

const routes = [
  {
    name: "Login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    name: "Register",
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: { requiresGuest: true },
  },
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    name: "Index",
    path: "/all-products",
    component: Index,
    meta: { requiresAuth: true },
  },
  {
    name: "Edit",
    path: "/edit/:id",
    component: Edit,
    meta: { requiresAuth: true },
  },
  {
    name: "Create",
    path: "/create",
    component: Create,
    meta: { requiresAuth: true },
  },
  {
    name: "CreateProduct",
    path: "/create-product/:categoryId",
    component: Create,
    meta: { requiresAuth: true },
  },
  {
    name: "AddCategory",
    path: "/add-category",
    component: () =>
      import(/* webpackChunkName: "add-category" */ "../views/AddCategoryView.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "CategoryProducts",
    path: "/category/:categoryId/:categoryName",
    component: () =>
      import(/* webpackChunkName: "category-products" */ "../views/CategoryProductsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "PlaceOrder",
    path: "/place-order",
    component: () =>
      import(/* webpackChunkName: "place-order" */ "../views/PlaceOrderView.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "OrderHistory",
    path: "/order-history",
    component: () =>
      import(/* webpackChunkName: "order-history" */ "../views/OrderHistoryView.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "Settings",
    path: "/settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const authenticated = isAuthenticated();

  // If route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !authenticated) {
    next("/login");
  }
  // If route is for guests only (login/register) and user is authenticated
  else if (to.meta.requiresGuest && authenticated) {
    next("/");
  }
  // Otherwise, proceed
  else {
    next();
  }
});

export default router;