import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";
import Create from "../views/Create.vue";
import Edit from "../views/Edit.vue";
import Home from "../views/Home.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Index",
    path: "/all-products",
    component: Index,
  },
  {
    name: "Edit",
    path: "/edit/:id",
    component: Edit,
  },
  {
    name: "Create",
    path: "/create",
    component: Create,
  },
  {
    name: "CreateProduct",
    path: "/create-product/:categoryId",
    component: Create,
  },
  {
    name: "AddCategory",
    path: "/add-category",
    component: () =>
      import(/* webpackChunkName: "add-category" */ "../views/AddCategoryView.vue"),
  },
  {
    name: "CategoryProducts",
    path: "/category/:categoryId/:categoryName",
    component: () =>
      import(/* webpackChunkName: "category-products" */ "../views/CategoryProductsView.vue"),
  },
  {
    name: "PlaceOrder",
    path: "/place-order",
    component: () =>
      import(/* webpackChunkName: "place-order" */ "../views/PlaceOrderView.vue"),
  },
  {
    name: "OrderHistory",
    path: "/order-history",
    component: () =>
      import(/* webpackChunkName: "order-history" */ "../views/OrderHistoryView.vue"),
  },
  {
    name: "Settings",
    path: "/settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;