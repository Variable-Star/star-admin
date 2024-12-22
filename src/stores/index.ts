import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { useAppStore } from "./modules/app-store";

const pinia = createPinia();

const appStore = useAppStore(pinia);

// 持久化插件
pinia.use(
  createPersistedState({
    auto: true,
    key: (id) => `${appStore.config.cacheKey}_${id}`,
    storage: sessionStorage,
  }),
);

export default pinia;
