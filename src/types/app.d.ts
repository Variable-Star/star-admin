/** 应用 */
declare namespace App {
  //#region 应用配置类型声明
  /** LOGO 位置 */
  type logoPisition = "header" | "menu" | "hide";
  /** 语言包 */

  type languageOptions = "auto" | "zh" | "en" | string;
  /** 路由模式 */

  type routerMode = "hash" | "history";
  /** 主题模式 */

  type themeMode = "auto" | "light" | "dark";
  /** 解锁方式 */

  type lockMethod = "password" | "verification" | "gesture";
  /** 布局方式 */

  type layoutType = "top" | "side" | "mix" | "doubleSide";
  /** 页面宽度 */

  type pageWidth = "auto" | number | string;
  /** 页面高度 */

  type pageHeight = "auto" | "fixed";
  /** 底部信息布局 */

  type footerLayout = "left" | "center" | "right";
  /** 组件大小 */

  type size = "" | "default" | "large" | "small";
  /** 页面动画 */

  type pageAnimation = "zoom-fade" | "slide-dynamic-origin" | "fade-slide" | "fade" | "fade-bottom" | "fade-scale";
  /** 多页签样式 */

  type multipleTabStyle = "line" | "card" | "card-gutter" | "rounded";
  /** 多页签菜单 */

  type multipleTabMenu = "none" | "contextmenu" | "right" | "both";
  /** 弹窗模式 */

  type popupMode = "modal" | "drawer";
  /** 登录页布局 */
  type loginLayout = "left" | "center" | "right";
  //#endregion 应用配置类型声明

  /** 应用配置 */
  interface Config {
    //#region 应用配置
    /**
     * 应用名称
     * @default package.json.name
     */
    name: string;

    /**
     * 应用版本
     * @default package.json.version
     */
    version: string;

    /**
     * 缓存标识
     * @default package.json.name
     */
    cacheKey: string;

    /**
     * 路由模式
     * @default "history"
     */
    routerMode: routerMode;

    /**
     * 动态标题，根据页面动态设置网页标题
     * @default true
     */
    dynamicTitle: boolean;

    /**
     * 路由白名单，不进行权限校验 根据路由名称判断
     * @default []
     */
    routerWhiteList: string[];

    /**
     * 接口请求地址
     * @default "http://127.0.0.1:2024/"
     */
    requestUrl: string;

    /**
     * 接口请求超时时间，单位毫秒
     * @default 10,000
     */
    requestTimeout: number;

    /**
     * 接口请求授权字段标识
     * @default "Authorization"
     */
    requestAuthorizationFlag: string;

    /**
     * 接口请求授权字段值格式
     * {value} 表示授权字段值
     * @default "Bearer {value}"
     */
    reuqestAuthorizationValueFormat: string;

    /**
     * 远程语言包 API 地址，设置为 "" 表示从本地加载
     * @default ""
     */
    localeUrl: string;

    /**
     * 默认语言，设置为 "auto" 表示自动检测
     * @default "auto"
     */
    defaultLanguage: languageOptions;

    /**
     * 备用语言
     * @default "zh"
     */
    fallbackLanguage: languageOptions;
    //#endregion 应用配置

    //#region 布局配置
    /**
     * 主题模式
     * @default "auto"
     */
    themeMode: themeMode;

    /**
     * 组件大小
     * @default "small"
     */
    size: size;

    /**
     * 字体大小 数字为 px，字符串为 rem，例如：16 或 1rem
     * @default 16
     */
    rootFontSize: number | string;

    /**
     * 字体大小列表
     * @default [12, 13, 14, 15, 16, 18]
     */
    fontSizeList: number[];

    /**
     * 主题颜色
     * @default "#07c160"
     */
    themeColor: string;

    /**
     * 主题颜色列表
     * @default ["#07c160", "#009688", "#00897b", "#00796b", "#00695c", "#004d40"]
     */
    themeColorList: string[];

    /**
     * 灰色模式
     * @default false
     */
    grayMode: boolean;

    /**
     * 色弱模式
     * @default false
     */
    colorWeaknessMode: boolean;

    /**
     * 页面/请求时显示加载进度条
     * @default true
     */
    loadProgress: boolean;

    /**
     * 页面布局
     * @default "doubleSide"
     */
    layout: layoutType;

    /**
     * 顶部高度
     * @default 72
     */
    headerHeight: number;

    /**
     * LOGO 地址，设置为 "" 表示不显示，"/"开始表示从静态资源加载，否则从网络加载
     * @default "/logo.png"
     */
    logo: string;

    /**
     * 图标位置
     * @default "header"
     */
    logoPisition: logoPisition;

    /**
     * 侧边宽度
     * @default 220
     */
    sideWidth: number;

    /**
     * 双侧边左侧宽度
     * @default 72
     */
    doubleSideWidth: number;

    /**
     * 页面动画
     * @default "fade"
     */
    pageAnimation: pageAnimation;

    /**
     * 页面宽度
     * @default "auto"
     */
    pageWidth: pageWidth;

    /**
     * 页面高度
     * @default "auto"
     */
    pageHeight: pageHeight;

    /**
     * 面包屑
     * @default true
     */
    breadCrumbs: boolean;

    /**
     * 面包屑图标
     * @default true
     */
    breadCrumbsIcon: boolean;

    /**
     * 多页签
     * @default true
     */
    multipleTab: boolean;

    /**
     * 多页签缓存，如果菜单中设置为不缓存则一直不缓存
     * @default true
     */
    keepAlive: boolean;

    /**
     * 多页签缓存最大数量
     * @default 20
     */
    keepAliveMax: number;

    /**
     * 固定页签
     * @default ["home"]
     */
    fixedMultipleTab: string[];

    /**
     * 多页签样式
     * @default "line"
     */
    multipleTabStyle: multipleTabStyle;

    /**
     * 多页签菜单
     * @default "both"
     */
    multipleTabMenu: multipleTabMenu;

    /**
     * 显示底部
     * @default true
     */
    footer: boolean;

    /**
     * 固定底部
     * @default true
     */
    fixedFooter: boolean;

    /**
     * 底部信息布局
     * @default "center"
     */
    footerLayout: footerLayout;

    /**
     * 弹窗模式
     * @default "modal"
     */
    popupMode: popupMode;
    //#endregion 布局配置

    //#region 功能配置
    /**
     * 快捷方式
     * @default true
     */
    shortcut: boolean;
    /**
     * 工具栏顺序，根据名称判断，顺序靠前的在左侧，顺序靠后的在右侧
     * @default ["search", "refresh", "lock", "screenshot", "watermark", "assembleSzie", "fontSize", "fullscreen", "theme", "language", "notify"]
     */
    toolbarOrder: string[];

    /**
     * 搜索功能
     * @default true
     */
    search: boolean;

    /**
     * 刷新功能
     * @default true
     */
    refresh: boolean;

    /**
     * 锁屏功能
     * @default true
     */
    lock: boolean;

    /**
     * 自动锁屏时间，单位分钟，0 表示不自动锁屏
     * @default 30
     */
    lockTime: number;

    /**
     * 解锁方式
     * @default "password"
     */
    unlockMethod: lockMethod;

    /**
     * 截图功能
     * @default true
     */
    screenshot: boolean;

    /**
     * 水印
     * @default false
     */
    watermark: boolean;

    /**
     * 水印文字
     * @default package.json.name
     */
    watermarkText: string;

    /**
     * 水印文字颜色
     * @default "rgba(180, 180, 180, 0.3)"
     */
    watermarkTextColor: string;

    /**
     * 组件大小功能
     * @default true
     */
    assembleSzie: boolean;

    /**
     * 字体大小功能
     * @default true
     */
    fontSize: boolean;

    /**
     * 全屏功能
     * @default true
     */
    fullscreen: boolean;

    /**
     * 主题功能
     * @default true
     */
    theme: boolean;

    /**
     * 语言功能
     * @default true
     */
    language: boolean;

    /**
     * 通知功能
     * @default true
     */
    notify: boolean;
    //#endregion 功能配置

    //#region 其他配置
    /**
     * 登录布局
     * @default "right"
     */
    loginLayout: loginLayout;

    /**
     * 开启注册功能
     * @default true
     */
    openRegistery: boolean;

    /**
     * 登录验证
     * @default true
     */
    loginVerify: boolean;

    /**
     * 注册验证
     * @default true
     */
    registerVerify: boolean;
    //#endregion 其他配置
  }
}
