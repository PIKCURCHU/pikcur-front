import axios, { AxiosRequestConfig, Method, AxiosHeaders } from "axios";
import { logout } from "./utility";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 8000,
});

// 요청 인터셉터 (토큰 자동 적용)
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

// 에러 공통 처리 (선택)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      if (!originalRequest.url?.includes("/auth/members/signin")) {
        // 로그인 요청이 아닌 경우만 로그아웃
        logout();
        alert("세션이 만료되어 로그아웃 됩니다.");
      }
    } else {
      console.error("API Error:", error.response || error);
    }
    return Promise.reject(error);
  }
);

/**
 * -----------------------------------------
 * 핵심: 모든 요청을 처리하는 공통 API 함수
 * -----------------------------------------
 */
export const apiRequest = async <T = any>(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
) => {
    const finalConfig: AxiosRequestConfig = {
        method,
        url,
        ...config,
    };

    // GET은 params, 나머지는 data 처리
    if (method === "GET") {
        finalConfig.params = data;
    } else {
        finalConfig.data = data;
    }

    const res = await instance(finalConfig);
    return res.data as T;
};

/**
 * -----------------------------------------
 * 편의용 helper 함수들
 * -----------------------------------------
 */
export const api = {
    get: <T = any>(url: string, params?: any, config?: AxiosRequestConfig) =>
        apiRequest<T>("GET", url, params, config),

    post: <T = any>(url: string, body?: any, config?: AxiosRequestConfig) =>
        apiRequest<T>("POST", url, body, config),

    put: <T = any>(url: string, body?: any, config?: AxiosRequestConfig) =>
        apiRequest<T>("PUT", url, body, config),

    delete: <T = any>(url: string, body?: any, config?: AxiosRequestConfig) =>
        apiRequest<T>("DELETE", url, body, config),

    /**
     * JSON 전송
     */
    json: <T = any>(method: Method, url: string, body?: any) =>
        apiRequest<T>(method, url, body, {
            headers: AxiosHeaders.from({ "Content-Type": "application/json" }),
        }),

    /**
     * FormData (multipart/form-data) 전송
     */
    formData: <T = any>(method: Method, url: string, form: FormData) =>
        apiRequest<T>(method, url, form, {
            headers: AxiosHeaders.from({ "Content-Type": "multipart/form-data" }),
        }),

    /**
     * x-www-form-urlencoded 전송
     */
    urlEncoded: <T = any>(method: Method, url: string, payload: any) => {
        const params = new URLSearchParams();
        Object.entries(payload).forEach(([key, value]) =>
            params.append(key, String(value))
        );

        return apiRequest<T>(method, url, params, {
            headers: AxiosHeaders.from({ "Content-Type": "application/x-www-form-urlencoded" }),
        });
    },
};