import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  /** 用户信息 */
  const userInfo = ref<Record<string, unknown>>();
  /** 获取用户信息 */
  const getUserInfo = () => userInfo;
  /** 登录令牌 */
  const token = computed(() => (userInfo.value?.token as string) || "");

  /** 登录 */
  const login = () => {};

  return { getUserInfo, token, login };
});
