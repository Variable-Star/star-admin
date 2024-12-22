import { LOGIN_PATH } from "@/constant";
import i18n from "@/lang";
import pinia from "@/stores";
import { useAppStore } from "@/stores/modules/app-store";
import { useUserStore } from "@/stores/modules/user-store";
import { useTitle } from "@vueuse/core";
import { parse, stringify } from "qs";
import { toRaw } from "vue";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type LocationQuery,
  type RouterHistory,
} from "vue-router";
import routes from "./routes";

const appStore = useAppStore(pinia);
const userStore = useUserStore(pinia);

// 默认 history 模式
let history: RouterHistory = createWebHistory(appStore.config.baseUrl);
// hash 模式
if (appStore.config.routerMode === "hash") {
  history = createWebHashHistory(appStore.config.baseUrl);
}

// 创建路由实例
const router = createRouter({
  history,
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return { left: 0, top: savedPosition ? savedPosition.top : 0 };
  },
  parseQuery: (query) => {
    return parse(query) as LocationQuery;
  },
  stringifyQuery: stringify,
});

// 添加静态白名单路由
const routeWhiteList = toRaw(appStore.config.routerWhiteList);
routes.forEach((item) => {
  routeWhiteList.push(item.path);
});

// 前置路由守卫
router.beforeEach((to) => {
  // 没有在路由白名单中且没有登陆，跳转登录页
  if (!routeWhiteList.includes(to.path) && !routeWhiteList.includes(to.name as string) && !userStore.token) {
    return { path: LOGIN_PATH, replace: true };
  }

  return true;
});

// 后置路由守卫
router.afterEach((to) => {
  // 动态设置标题
  let title = appStore.config.name;
  if (appStore.config.dynamicTitle && !!to.meta.title) {
    title = `${i18n.global.t(to.meta.title)}${title ? ` | ${i18n.global.t(title)}` : ""}`;
  }
  useTitle(title);
});

export default router;
