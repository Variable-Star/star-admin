import { LOGIN_PATH } from "@/constant";
import type { RouteRecordRaw } from "vue-router";

/** 静态路由 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Root",
    redirect: "/home",
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/pages/home/index.vue"),
        meta: {
          title: "routes.home",
        },
      },
    ],
  },
  {
    path: LOGIN_PATH,
    name: "LoginIn",
    component: () => import("@/views/pages/login/index.vue"),
    meta: {
      title: "routes.login",
    },
  },
  {
    path: "/lock",
    name: "Lock",
    component: () => import("@/views/pages/lock/index.vue"),
    meta: {
      title: "routes.lock",
    },
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/pages/error/403.vue"),
    meta: {
      title: "403",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/pages/error/404.vue"),
    meta: {
      title: "404",
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/pages/error/500.vue"),
    meta: {
      title: "500",
    },
  },
];

export default routes;
