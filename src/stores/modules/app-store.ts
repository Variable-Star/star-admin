import appConfig from "@/config";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    /** 自定义配置 */
    const customConfig = ref<Partial<App.Config>>({});
    /** 配置 */
    const config = computed(() => Object.assign({}, appConfig, customConfig.value));
    /** 更新配置 */
    const updateConfig = (config: Partial<App.Config> = {}) => {
      Object.assign(customConfig.value, config);
    };
    /** 重置配置 */
    const resetConfig = () => {
      customConfig.value = {};
    };

    return {
      config,
      updateConfig,
      resetConfig,
    };
  },
  { persist: true },
);
