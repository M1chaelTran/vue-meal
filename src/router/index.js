import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/my-order",
    component: () => import("../views/MyOrder.vue"),
  },
  {
    path: "/menu",
    component: () => import("../views/Menu.vue"),
  },
  {
    path: "/sign-in",
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/join",
    component: () => import("../views/Join.vue"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
