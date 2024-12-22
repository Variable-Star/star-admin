import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { viteMockServe } from "vite-plugin-mock";
import vueDevTools from "vite-plugin-vue-devtools";
import { ENV_PREFIXES } from "./src/constant";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), ENV_PREFIXES) as ImportMetaEnv;
  // 处理环境变量
  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key) && ENV_PREFIXES.some((item) => key.startsWith(item))) {
      const value = env[key];
      if (value === "true") {
        env[key] = true;
      } else if (value === "false") {
        env[key] = false;
      }
    }
  }
  // 是否为开发环境
  const isDev = env.MODE === "development";
  // 是否为生产环境
  const isProd = env.MODE === "production";

  return {
    base: env.VITE_BASE_URL,
    envPrefix: ENV_PREFIXES,
    // 全局变量
    define: {
      "process.env": process.env,
    },
    // esbuild 配置
    esbuild: {
      pure: ["console.log", "debugger"],
      drop: ["debugger"],
    },
    // 插件
    plugins: [
      vue(),
      vueJsx(),
      // 自动导入
      AutoImport({
        include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        dirs: ["src/components/**", "src/views/**"],
        resolvers: [],
        dts: "src/types/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: "readonly",
        },
      }),
      // 组件自动导入
      Components({
        include: [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/],
        dirs: ["src/components/**"],
        resolvers: [
          IconsResolver({
            prefix: "icon",
            customCollections: ["locale"],
          }),
        ],
        dts: "src/types/auto-components.d.ts",
      }),
      // 图标自动导入
      Icons({
        customCollections: {
          locale: FileSystemIconLoader("src/assets/icons", (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')),
        },
      }),
      vueDevTools(),
      // 模拟数据
      viteMockServe({
        mockPath: "mock",
        ignore: /^_/,
        watchFiles: true,
        enable: env.VITE_USE_MOCK,
        logger: isDev && env.VITE_USE_MOCK,
        cors: env.VITE_USE_MOCK,
      }),
      // 打包分析
      visualizer({
        open: isProd && env.VITE_BUILD_VISUALIZER,
        gzipSize: isProd && env.VITE_BUILD_VISUALIZER,
        brotliSize: isProd && env.VITE_BUILD_VISUALIZER,
      }),
      // 压缩
      viteCompression({
        verbose: true,
        disable: isDev || !env.VITE_BUILD_COMPRESSION,
        deleteOriginFile: false,
        threshold: 1024,
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    // 解析器配置
    resolve: {
      // 别名配置
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // css 预处理器配置
    css: {
      preprocessorOptions: {},
    },
    // 开发服务器配置
    server: {
      host: false,
      open: false,
      proxy: {},
      warmup: {
        clientFiles: ["./index.html", "./src/{views,components}/**/*"],
      },
    },
    // 打包配置
    build: {
      outDir: "dist",
      assetsDir: "assets",
      assetsInlineLimit: 1024 * 4,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1024,
      sourcemap: false,
      // rollup 打包配置
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              console.log("manualChunks: %s", id.toString());

              return env.VITE_BUILD_MANUAL_CHUNKS
                ? id.toString().split("node_modules/.pnpm/")[1].split("/")[0].toString()
                : "vendor";
            } else {
              return undefined;
            }
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
