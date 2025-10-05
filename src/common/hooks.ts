// 회사 예시 코드 / 이 파일이 무슨 역할을 할 것인지 인지용 

// import { AgGridReact } from "ag-grid-react";
// import { MutableRefObject, RefObject, useCallback, useRef } from "react";
// import { RefetchOptions, RefetchQueryFilters, useQuery, UseQueryOptions } from "react-query";
// import api from "./api";
// import { Dictionary, FormDictionary } from "./types";
// import { executeIdle, isNullOrWhitespace, safeString, showLoading } from "./utility";

// export const useFormRef = (): [MutableRefObject<any>, (data: Dictionary) => void] => {
//   const formRef = useRef<any>();

//   const setForm = (data: Dictionary) => {
//     const keys = Object.keys(data);
//     keys.forEach(key => {
//       formRef.current.elements[key] && (formRef.current.elements[key].value = data[key]);
//     });
//   }

//   return [formRef, setForm];
// }

// export const useSubmitHandler: (dataHandler: (formData: FormData, data: FormDictionary) => void) => (e: React.FormEvent<HTMLFormElement>) => void = 
//   (dataHandler) => {
//   const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const data = Object.fromEntries(formData);
    
//     dataHandler(formData, refineData(data));
//   };

//   return formSubmitHandler;
// }

// export const useSubmitHandlerMultiple: (dataHandler: (formData: FormData, data: FormDictionary) => void) => (e: React.FormEvent<HTMLFormElement>) => void = 
//   (dataHandler) => {
//   const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);

//     dataHandler(formData, refineData(formToDictionary(formData)));
//   };

//   return formSubmitHandler;
// }

// export const formToDictionary = (formData: FormData): FormDictionary => {
//   const data: FormDictionary = {};

//   for (const pair of formData.entries()) {
//     if(data.hasOwnProperty(pair[0])){
//       const ex = data[pair[0]];
//       if(ex instanceof Array)
//         ex.push(pair[1]);
//       else
//         data[pair[0]] = [ex, pair[1]];
//     }else{
//       data[pair[0]] = pair[1];
//     }
//   }

//   return data;
// }

// export const useFormCallbackRef = (callbackHandler: (ref: any) => void): [
//   MutableRefObject<Dictionary>, 
//   (form: any) => void] => {

//   const formData = useRef<Dictionary>({});

//   const initFormCallback = useCallback((form: any) => {
//     if (form !== null) {
//       setFormData(form, formData.current);

//       callbackHandler(form);
//     }
//   }, []);

//   return [formData, initFormCallback];
// }

// export const setFormData = (formRef: any, data: Dictionary): void => {
//   formRef.reset();

//   const keys = Object.keys(data);
//   keys.forEach(key => {
//     if(formRef.elements[key]){
//       formRef.elements[key].value = data![key];
//     }
//   });
// }

// export const useEditRef: () => [MutableRefObject<Dictionary>, (row: Dictionary) => void,  () => void] = () => {
//   const editRef = useRef<any>();
//   const setForm = (row: Dictionary) => {
//     editRef.current.setForm(row);
//     editRef.current.setShowModal(true);
//   }
//   const closeModal = () => {
//     editRef.current.setShowModal(false);
//   }

//   return [editRef, setForm, closeModal];
// }

// export const useSearchRef: () => [
//   MutableRefObject<Dictionary>, 
//   () => Dictionary] = () => {
//   const searchRef = useRef<any>();

//   const getSearch = () => {
//     const formData = new FormData(searchRef.current.getSearchRef().current);
//     const dic: any = Object.fromEntries(formData);
//     for (const key in dic){
//       if (isNullOrWhitespace(safeString(dic[key])))
//         formData.delete(key);
//     }
    
//     return Object.fromEntries(formData);
//   }

//   return [searchRef, getSearch];
// }

// export const useGridRef: () => [RefObject<AgGridReact>, (data: Dictionary[]) => void] = () => {
//   const gridRef = useRef<AgGridReact>(null);
//   const setList = (data: Dictionary[]) => {
//     if(gridRef.current){
//       gridRef.current!.api?.setGridOption('rowData', data);
//       showLoading(gridRef, false);
//     }
//     else{
//       executeIdle(() => {
//         if(gridRef.current){
//           gridRef.current!.api?.setGridOption('rowData', data);
//           showLoading(gridRef, false);
//         }
//       })
//     };    
//   }

//   return [gridRef, setList];
// }

// export const useApi = (
//   queryFn: string, 
//   getSearchFn: () => Dictionary, 
//   gridRef?: RefObject<AgGridReact>,
//   queryOption?: Omit<UseQueryOptions<any, unknown, any, string>, "queryKey" | "queryFn">
//   ) => {
//   const option = {...{ enabled: false, refetchOnWindowFocus: false, retry: 0 }, ...queryOption};
//   const { refetch } = useQuery(queryFn, () =>
//     api<any>("get", queryFn, getSearchFn()).then(res => res.data), 
//     option);
//   const get = (row: Dictionary) => api<any>("get", queryFn + "/select", row);
//   const post = (row: Dictionary) => api<any>("post", queryFn, row);
//   const put = (row: Dictionary) => api<any>("put", queryFn, row);
//   const del = (row: Dictionary) => api<any>("delete", queryFn, row);

//   if(gridRef)
//     return { 
//       refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => {
//         showLoading(gridRef, true);
//         return refetch(options);
//       }, 
//       get,
//       post, 
//       put, 
//       del };  

//   return { refetch, get, post, put, del };
// }

// export const useFocus = () => {
//   const ref = useRef(null);
//   const setFocus = () => {
//     ref.current && (ref.current as any).focus();
//   };

//   return [ref, setFocus] as const;
// };

// export const refineData = (data: Dictionary) => {
//   const keys = Object.keys(data);
//   keys.forEach(key => {    
//     if (typeof data[key] !== 'string') 
//       return;

//     if (isNullOrWhitespace(safeString(data[key]))){
//       data[key] = '';
//     }
//   });

//   return data;
// }
