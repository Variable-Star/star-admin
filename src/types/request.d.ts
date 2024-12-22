import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * 请求配置
 */
interface BaseRequestConfig extends InternalAxiosRequestConfig {
  /**
   * 取消重复的请求
   * @default true
   */
  cancelRepeatReq?: boolean;

  /**
   * 显示请求的错误码消息
   * @default true
   */
  showReqCodeErrorMsge?: boolean;

  /**
   * 显示请求响应的错误消息
   * @default true
   */
  showResErrorMsg?: boolean;

  /**
   * 显示加载
   * @default true
   */
  loading?: boolean;

  /**
   * 请求加载配置
   */
  loadingConfig?: LoadingConfig;

  /**
   * 自定义请求拦截器
   * @param config 请求配置
   * @returns
   */
  customRequestInterceptors?: (config: BaseRequestConfig) => void;

  /**
   * 自定义响应拦截器
   * @param response 响应配置
   * @returns
   */
  customResponseInterceptors?: (response: BaseRequestResponse) => void;
}

/**
 * 请求响应
 */
interface BaseRequestResponse extends AxiosResponse {
  config: BaseRequestConfig;
}

/**
 * 接口响应数据
 */
interface BaseRequestRes<T> {
  /** 响应码 */
  code: number;

  /** 响应消息 */
  message: string;

  /** 数据 */
  data: T;

  /** 成功标识 */
  success: boolean;
}

/**
 * 接口分页数据
 */
interface BaseRequestPage<T> {
  /** 数据 */
  records: T;

  /** 分页总数 */
  total: number;
}

/**
 * 接口响应分页数据
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BaseRequestResPage<T> extends BaseRequestRes<BaseRequestPage<T>> {}
