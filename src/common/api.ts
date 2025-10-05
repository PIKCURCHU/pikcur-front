// 회사 예시 코드 / 이 파일이 무슨 역할을 할 것인지 인지용


// import axios, { AxiosResponseHeaders, InternalAxiosRequestConfig, RawAxiosResponseHeaders } from 'axios';
// import { globalContext } from './globalContext';
// import { doLogout } from './utility';

// export type HttpMethod = "get" | "put" | "post" | "delete" | "upload" | "download" | "downpost";

// export interface UniResponse<T = any, D = any> {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders | undefined;
//   config: InternalAxiosRequestConfig<D> | undefined;
//   request?: any;
// }

// export const getBaseUrl = () => import.meta.env.PROD ? import.meta.env.BASE_URL : '';
// export const getApiUrl = () => `${getBaseUrl()}/api`;

// const findHostObjects = (window: any) => { 
//   const chrom = window["chrome"];
//   if (!chrom) return null;

//   const hostObjects = chrom.webview?.hostObjects;
//   if (!hostObjects) return null;

//   return hostObjects;
// }

// const api: <T>(method: HttpMethod, url: string, params: {} | [] | FormData) => 
//   Promise<UniResponse<T, any>> = (method, url, params) => {
//   if (!url.startsWith("/api"))
//     url = `/api${!url.startsWith("/") ? "/" + url : url}`;

//   if(globalContext.hostObjects == undefined)
//     globalContext.hostObjects = findHostObjects(window);

//   if(!globalContext.hostObjects)
//     return apiByRest(method, url, params);
//   else
//     return apiByHost(method, url, params);
// };

// const apiByRest: <T>(method: HttpMethod, url: string, params: {} | [] | FormData) =>
//   Promise<UniResponse<T, any>> = (method, url, params) => {

//   if(url.startsWith("/api"))
//     url = `${getBaseUrl()}${url}`;

//   if(url.startsWith("//"))
//     url = url.substring(1);

//   const headers = {
//     Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
//   };
  
//   switch (method) {
//     case "get":
//       return axios.get(url, { params, headers: headers });
//     case "put":
//       return axios.put(url, params, { headers: headers });
//     case "post":
//       return axios.post(url, params, { headers: headers });
//     case "delete":
//       return axios.delete(url, { params, headers: headers });
//     case "upload":
//       const uploadHeaders = {...headers, ...{ "Content-Type": "multipart/form-data" }};
//       return axios.put(url, params, { headers: uploadHeaders });
//     case "download":
//       return axios.get(url, { params, headers: headers, responseType: "blob" });
//     case "downpost":
//       return axios.post(url, params, { headers: headers, responseType: "blob" });
//     }
// };

// const apiByHost: <T>(method: HttpMethod, url: string, params: {} | [] | FormData) =>
//   Promise<UniResponse<T, any>> = (method, url, params) => {
//     var token = localStorage.getItem("auth-token");    
//     const bridge = globalContext.hostObjects.bridge;

//     return new Promise((resolve, reject) => {
//       bridge.Run(method, url, token, JSON.stringify(params)).then((result: any) => {
//         resolve({ data: JSON.parse(result), status: 200, statusText: "OK", headers: undefined, config: undefined });
//       }).catch((error: any) => {
//         reject(error);
//       }
//     )});
// };

// axios.interceptors.response.use(response => {
//   return response;
//   },
//   error => {
//     if(error.response?.data == "TokenExpired"){
//       if(localStorage.getItem("auth-token")){
//         doLogout();
        
//         alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
//         window.location.reload();
//         return;
//       }
//     } else if(error.response?.status == 401){
//       alert("해당 메뉴 또는 기능에 접근할 권한이 없습니다.");
//       window.location.href = "/";
//       return;
//     }

//     throw error;
//   }
// );

// export default api;