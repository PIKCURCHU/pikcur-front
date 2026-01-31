import axios, { AxiosRequestConfig, Method, AxiosHeaders } from "axios";
import { logout } from "./utility";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const API_BASE_URL = process.env.REACT_APP_API_URL || "";

const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 8000,
    withCredentials: true,
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

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        const data = error.response?.data;

        if (error.code === 'ERR_NETWORK') {
            alert("서버와 연결할 수 없습니다.");
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {

            if (!originalRequest.url?.includes("/auth/members/signin")) {

                if (data?.code === "EXPIRATION") {
                    alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
                } else if (data?.code === "NO_TOKEN") {
                    alert("로그인이 필요합니다.");
                } else {
                    alert(data?.message || "인증 정보가 유효하지 않습니다.");
                }

                logout();
            }
        }

        else {
            if (data?.message) alert(data.message);
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
        withCredentials: true,
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
    form: {
        post: <T = any>(url: string, data?: any, file?: File | File[], dataKey?: string) =>
            sendForm<T>("POST", url, data, file, dataKey),
        put: <T = any>(url: string, data?: any, file?: File | File[], dataKey?: string) =>
            sendForm<T>("PUT", url, data, file, dataKey),
    },

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

/**
 * data + file을 FormData로 자동 변환해서 전송하는 내부 함수
 */
function sendForm<T>(
    method: Method,
    url: string,
    data?: any,
    file?: File | File[],
    dataKey?: string
) {
    const form = new FormData();

    if (data) {
        if (dataKey) {
            form.append(
                dataKey,
                new Blob([JSON.stringify(data)], { type: "application/json" })
            );
        } else {
            Object.entries(data).forEach(([key, value]) => {
                if (typeof value === "object" && !(value instanceof File)) {
                    form.append(
                        key,
                        new Blob([JSON.stringify(value)], { type: "application/json" })
                    );
                } else {
                    form.append(key, value as any);
                }
            });
        }
    }

    if (file) {
        if (Array.isArray(file)) {
            file.forEach(f => form.append("image", f));
        } else {
            form.append("image", file);
        }
    }

    return apiRequest<T>(method, url, form, {
        headers: AxiosHeaders.from({ "Content-Type": "multipart/form-data" }),
        withCredentials: true,
    });
}

/**
 * websoket + STOMP 설정
 */
interface CustomStompClient extends Client {
    _alarmListener?: (body: any) => void;
}

const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL || "";

export const createStompClient = () => {
    const token = localStorage.getItem("token");
    const socket = new SockJS(
        WEBSOCKET_API_URL
            ? WEBSOCKET_API_URL
            : "/wc"   // ⭐ 운영용 상대경로
    );

    const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    }) as CustomStompClient;

    stompClient.onConnect = () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const memberNo = payload.memberNo;

        stompClient.subscribe(`/topic/alarm/${memberNo}`, (message: any) => {
            const body = JSON.parse(message.body);
            console.log("알람 수신:", body);

            if (stompClient._alarmListener) {
                stompClient._alarmListener(body);
            }
        });
    };

    if (token) stompClient.activate();

    return stompClient;
};

export const stompClient = createStompClient();
