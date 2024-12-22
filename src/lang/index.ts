import pinia from "@/stores";
import { useAppStore } from "@/stores/modules/app-store";
import { computed } from "vue";
import { createI18n } from "vue-i18n";
import en from "./en.json";
import zh from "./zh.json";

const appStore = useAppStore(pinia);

/** 当前语言 */
let locale = appStore.config.defaultLanguage;
/** 备用语言 */
const fallbackLocale = appStore.config.fallbackLanguage;
// 根据浏览器语言设置语言
if (locale === "auto") {
  const boswerLang = navigator.language;
  locale = ["cn", "zh", "zh-cn"].includes(boswerLang.toLowerCase()) ? "zh" : "en";
  appStore.updateConfig({ defaultLanguage: locale });
}

/** 语言包 */
const messages = { zh, en };
// 远程加载语言包
if (appStore.config.localeUrl) {
  const url = appStore.config.localeUrl;
  if (url) {
    // TODO:加载远程语言包TODO
  }
}

/** i18n 实例 */
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  fallbackLocale,
  messages,
});

/** 获取当前语言 */
const currentLang = computed(() => i18n.global.locale.value);

/** 语言选项 */
const localeOptions = [
  { key: "zh", title: "简体中文" },
  { key: "en", title: "English" },
];
/** 设置当前语言 */
const setLang = (lang: string) => {
  appStore.updateConfig({ defaultLanguage: lang });
  i18n.global.locale.value = lang as typeof i18n.global.locale.value;
};

export default i18n;
export { currentLang, localeOptions, setLang };
