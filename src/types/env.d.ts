/// <reference types="vite/client" />

/** 环境变量类型定义 */
interface ImportMetaEnv {
  /** 基础路径 */
  readonly VITE_BASE_URL: string;

  /** 是否使用 mock 数据 */
  readonly VITE_USE_MOCK: boolean;

  /** 是否开启打包分析 */
  readonly VITE_BUILD_VISUALIZER: boolean;

  /** 是否开启压缩 */
  readonly VITE_BUILD_COMPRESSION: boolean;

  /** 是否开启手动分包 */
  readonly VITE_BUILD_MANUAL_CHUNKS: boolean;
}

interface importmeta {
  readonly env: importmetaenv;
}
