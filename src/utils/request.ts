import { useAppStore } from "@/stores/modules/app-store";
import { useUserStore } from "@/stores/modules/user-store";
import type { BaseRequestConfig, BaseRequestRes, BaseRequestResponse } from "@/types/request";
import axios, { type AxiosInstance, type CustomParamsSerializer, type Method } from "axios";
import NProgress from "nprogress";
import { parse, stringify } from "qs";

const {
  config: { requestUrl, requestTimeout, requestAuthorizationFlag, reuqestAuthorizationValueFormat },
} = useAppStore();
const userStore = useUserStore();

/**
 * 基础请求请求队列
 */
class BaseRquestPending {
  constructor() {}

  /** 正在进行中的请求记录 */
  private static pendingMap: Map<string, AbortController> = new Map();

  /**
   * 生成唯一的每个请求的唯一 key
   * @param config 请求配置
   * @returns 请求唯一 key
   */
  private getPendingKey = (config: BaseRequestConfig) => {
    if (typeof config.data === "string") {
      config.data = parse(config.data);
    }
    return [config.url, config.method, stringify(config.params), stringify(config.data)].join("&");
  };

  /**
   * 储存请求
   * @param config 请求配置
   */
  public addPending = (config: BaseRequestConfig) => {
    if (!config.signal) {
      const controller = new AbortController();
      config.signal = controller.signal;

      BaseRquestPending.pendingMap.set(this.getPendingKey(config), controller);
    }
  };

  /**
   * 删除请求
   * @param config 请求配置
   */
  public removePending = (config: BaseRequestConfig) => {
    const pendingKey = this.getPendingKey(config);

    if (BaseRquestPending.pendingMap.has(pendingKey)) {
      BaseRquestPending.pendingMap.get(pendingKey)?.abort();
      BaseRquestPending.pendingMap.delete(pendingKey);
    }
  };
}

/**
 * 基础请求
 */
class BaseRequest {
  /**
   * 构造函数
   *
   * @param baseURL 请求基础地址
   * @param timeout 请求超时时间
   */
  constructor(baseURL: string = requestUrl, timeout: number = requestTimeout) {
    this.createInstance(baseURL, timeout);
    this.setupRequestInterceptors();
    this.setupResponseInterceptors();
  }

  /**
   * 请求队列
   */
  private static pending: BaseRquestPending = new BaseRquestPending();

  /**
   * 请求实例
   */
  private static instance: AxiosInstance;

  /**
   * 创建请求实例
   */
  private createInstance(baseURL: string, timeout: number) {
    BaseRequest.instance = axios.create({
      baseURL,
      timeout: timeout >= 0 ? timeout : 0,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      paramsSerializer: {
        serialize: stringify as unknown as CustomParamsSerializer,
      },
    });
  }

  /**
   * 设置请求拦截器
   */
  private setupRequestInterceptors() {
    BaseRequest.instance.interceptors.request.use(
      (config: BaseRequestConfig) => {
        const pending = BaseRequest.pending;
        pending.removePending(config);

        // 添加自定义请求前拦截器操作
        if (config.customRequestInterceptors) config.customRequestInterceptors(config);

        if (config.loading) {
          // TODO:显示 loading 效果
          if (config.loadingConfig?.type === "both" || config.loadingConfig?.type === "nprogress") {
            NProgress.start();
          }
        }

        // 自动在授权请求头和请求体中携带授权信息
        if (userStore.token) {
          config.headers[requestAuthorizationFlag] = reuqestAuthorizationValueFormat.replace(
            "{value}",
            userStore.token,
          );
        }

        // 如果配置取消重复请求则添加当前请求的标志
        if (config.cancelRepeatReq) {
          pending.addPending(config);
        }

        return config;
      },
      (error) => {
        console.error(error);
        BaseRequest.pending.removePending(error.config);
        return Promise.reject(error);
      },
    );
  }

  /**
   * 设置响应拦截器
   */
  private setupResponseInterceptors() {
    BaseRequest.instance.interceptors.response.use(
      (response: BaseRequestResponse) => {
        const config = response.config;

        BaseRequest.pending.removePending(config);

        // 添加自定义响应前拦截器操作
        if (config.customResponseInterceptors) {
          config.customResponseInterceptors(response);
        }

        if (config.loading) {
          // TODO:关闭 loading 效果
          if (config.loadingConfig?.type === "both" || config.loadingConfig?.type === "nprogress") {
            NProgress.done();
          }
        }

        // 处理错误码信息
        if (response.status !== 200) {
          // TODO:显示错误信息
        }

        // 处理请求响应
        if (!response.data.success && config.showResErrorMsg) {
          // TODO:显示错误信息
          return Promise.reject(response.data.message);
        }

        return response;
      },
      (error) => {
        console.error(error);
        BaseRequest.pending.removePending(error.config);

        if (error.config.loading) {
          // TODO:关闭 loading 效果
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * 通用请求
   * @example const [res, err] = request<User>("post", "/user/login", { data: { account: "admin", pwd: "123456" } });
   */
  public request<T = unknown>(
    method: Method,
    url: string,
    config: BaseRequestConfig,
  ): Promise<[BaseRequestRes<T> | null, unknown]> {
    // 默认配置
    const defaultConfig: Omit<BaseRequestConfig, "headers"> = {
      cancelRepeatReq: true,
      showReqCodeErrorMsge: true,
      showResErrorMsg: true,
      loading: true,
      loadingConfig: {
        type: "nprogress",
      },
    };

    // 加载默认配置
    if (config.loading && config.loadingConfig?.type && ["both", "element"].includes(config.loadingConfig.type)) {
      defaultConfig.loadingConfig = {
        type: config.loadingConfig.type,
        fullscreen: true,
        lock: true,
        text: "加载中...",
        background: "rgba(0, 0, 0, 0.7)",
      };
    }

    // 合并请求配置
    const requestConfig = Object.assign(defaultConfig, { method, url, ...config });

    return new Promise((resolve) => {
      BaseRequest.instance
        .request<BaseRequestRes<T> | null>(requestConfig)
        .then((response) => resolve([response.data, null]))
        .catch((error) => resolve([null, error]));
    });
  }

  /**
   * get 请求
   * @example const [res, err] = get<User>("/user", { data: { id: "999999999" } });
   */
  public get<T>(url: string, config: BaseRequestConfig) {
    return this.request<T>("get", url, config);
  }

  /**
   * post 请求
   * @example const [res, err] = post<User>("/user", { data: { account: "admin", pwd: "123456" } });
   */
  public post<T>(url: string, config: BaseRequestConfig) {
    return this.request<T>("post", url, config);
  }

  /**
   * put 请求
   * @example const [res, err] = put<User>("/user", { data: { id: "999999999", account: "admin", pwd: "654321" } });
   */
  public put<T>(url: string, config: BaseRequestConfig) {
    return this.request<T>("put", url, config);
  }

  /**
   * delete 请求
   * @example const [res, err] = delete<User>("/user", { data: { id: "999999999" } });
   */
  public delete<T>(url: string, config: BaseRequestConfig) {
    return this.request<T>("delete", url, config);
  }
}

export const request = new BaseRequest();
