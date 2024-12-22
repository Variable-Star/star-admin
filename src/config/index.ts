import axios from "axios";
import { readonly } from "vue";
import packages from "~/package.json";
import devConfig from "./dev-config.json";

const { DEV: isDev, VITE_BASE_URL: baseUrl } = import.meta.env;

/** 默认配置 */
const defaultConfig: App.Config = {
  name: packages.name,
  version: packages.version,
  cacheKey: packages.name,
  routerMode: "hash",
  dynamicTitle: true,
  routerWhiteList: [],
  requestUrl: "http://127.0.0.1:2024/",
  requestTimeout: 1000 * 10,
  requestAuthorizationFlag: "Authorization",
  reuqestAuthorizationValueFormat: "Bearer ${value}",
  localeUrl: "",
  defaultLanguage: "auto",
  fallbackLanguage: "zh",

  themeMode: "auto",
  size: "small",
  rootFontSize: 16,
  fontSizeList: [12, 13, 14, 15, 16, 18],
  themeColor: "#07c160",
  themeColorList: ["#07c160", "#009688", "#00897b", "#00796b", "#00695c", "#004d40"],
  grayMode: false,
  colorWeaknessMode: false,
  loadProgress: true,
  layout: "doubleSide",
  headerHeight: 72,
  logo: `${import.meta.env.BASE_URL}/logo.png`.replaceAll("//", "/"),
  logoPisition: "header",
  sideWidth: 220,
  doubleSideWidth: 72,
  pageAnimation: "fade",
  pageWidth: "auto",
  pageHeight: "auto",
  breadCrumbs: true,
  breadCrumbsIcon: true,
  multipleTab: true,
  keepAlive: true,
  keepAliveMax: 20,
  fixedMultipleTab: ["home"],
  multipleTabStyle: "line",
  multipleTabMenu: "both",
  footer: true,
  fixedFooter: true,
  footerLayout: "center",
  popupMode: "modal",

  shortcut: true,
  toolbarOrder: [
    "search",
    "refresh",
    "lock",
    "screenshot",
    "watermark",
    "assembleSzie",
    "fontSize",
    "fullscreen",
    "theme",
    "language",
    "notify",
  ],
  search: true,
  refresh: true,
  lock: true,
  lockTime: 30,
  unlockMethod: "password",
  screenshot: true,
  watermark: true,
  watermarkText: packages.name,
  watermarkTextColor: "rgba(180, 180, 180, 0.3)",
  assembleSzie: true,
  fontSize: true,
  fullscreen: true,
  theme: true,
  language: true,
  notify: true,

  loginLayout: "right",
  openRegistery: true,
  loginVerify: true,
  registerVerify: true,
};

/** 合并环境配置 */
const combineEnvConfig = async () => {
  try {
    // 开发模式使用本地配置
    let envConfig = devConfig;

    // 非开发模式从服务器获取配置
    if (!isDev) {
      const { status, data } = await axios({
        url: `${import.meta.env.BASE_URL}/config.json`.replaceAll("//", "/"),
        method: "get",
        timeout: 1000 * 10,
      });

      if (status !== 200) {
        console.error("获取配置失败，请检查配置文件是否正确！");
      }

      envConfig = data;
    }

    Object.assign(defaultConfig, envConfig);
  } catch (error) {
    console.error(error);
  }
};
await combineEnvConfig();

export default readonly(Object.assign({}, defaultConfig, { baseUrl }));
