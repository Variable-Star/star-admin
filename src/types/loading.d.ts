/**
 * Element Plus 加载配置
 */
interface ElementLoadingConfig {
  /**
   * 是否全屏
   * @default true
   */
  fullscreen?: boolean;

  /**
   * 是否需要锁定屏幕的滚动
   * @default true
   */
  lock?: boolean;

  /**
   * 显示在加载图标下方的加载文案
   * @default '加载中...'
   */
  text?: string;

  /**
   * 自定义加载图标类名
   */
  spinner?: string;

  /**
   * 遮罩背景色
   * @default 'rgba(0, 0, 0, 0.7)'
   */
  background?: string;

  /**
   * loading 的自定义类名
   */
  customClass?: string;
}

/**
 * NProgress 配置
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NProgressLoadingConfig {}

/**
 * 加载配置
 */
type LoadingConfig =
  | ({ type: "nprogress" } & NProgressLoadingConfig)
  | ({ type: "element" } & ElementLoadingConfig)
  | ({ type: "both" } & NProgressLoadingConfig & ElementLoadingConfig);
