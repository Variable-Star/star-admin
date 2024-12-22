import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    /**
     * 标题，可使用国际化
     */
    title?: string;

    /**
     * 图标
     */
    icon?: string;

    /**
     * 排序号
     */
    order?: number;

    /**
     * 页面是否缓存
     * @default true
     */
    keepAlive?: boolean;

    /**
     * 是否在路由菜单显示
     * @default true
     */
    showInMenu?: boolean;

    /**
     * 是否永远显示,（只有一个时, 默认会将那个子路由当做根路由显示在菜单栏）
     * @default false
     */
    alwaysShow?: boolean;

    /**
     * 切换时是否使用切换动画
     * @default true
     */
    animation?: boolean;

    /**
     * 是否在页签栏中显示
     * @default true
     */
    showInTabs?: boolean;

    /**
     * 是否固定在页签栏中,例如首页
     * @default false
     */
    fixedInTabs?: boolean;

    /**
     * 是否在面包屑中显示
     * @default true
     */
    showInBreadcrumb?: false;

    /**
     * 默认查询参数
     */
    defaultQuery?: string;
  }
}
