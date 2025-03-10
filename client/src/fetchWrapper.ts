import type {FetchOptions} from "@/types/types";

const url=import.meta.env.VITE_API_URL

const http={
    get:(uri,options:FetchOptions={})=>{
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem('csrf')??'',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
        };
        let fullUrl = `${url}${uri}`;
        if (options?.params) {
            const queryParams = new URLSearchParams(options.params);
            fullUrl+=`?${queryParams}`
        }
        return fetch(fullUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw error })
                }
                return response.json();
            })
    },
    post:(uri,data={},options:FetchOptions={})=>{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem('csrf')??'',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body:JSON.stringify(data)
        };
        let fullUrl = `${url}${uri}`;
        if (options?.params) {
            const queryParams = new URLSearchParams(options.params);
            fullUrl+=`?${queryParams}`
        }
        return fetch(fullUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw error })
                }
                return response.json();
            })
    },
    patch:(uri,data,options:FetchOptions={})=>{
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem('csrf')??'',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
            body:JSON.stringify(data)
        };
        let fullUrl = `${url}${uri}`;
        if (options?.params) {
            const queryParams = new URLSearchParams(options.params);
            fullUrl+=`?${queryParams}`
        }
        return fetch(fullUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw error })
                }
                return response.json();
            })
    },
    delete:(uri,options:FetchOptions={})=>{
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': localStorage.getItem('csrf')??'',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: "include",
        };
        let fullUrl = `${url}${uri}`;
        if (options?.params) {
            const queryParams = new URLSearchParams(options.params);
            fullUrl+=`?${queryParams}`
        }
        return fetch(fullUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw error })
                }
                return response.json();
            })
    }
}

// http.interceptors.request.use((config: AxiosRequestConfig) => {
//     if (!config) {
//         config={
//             headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//         }
//     }else{
//         if (config.headers) {
//             config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//         }
//     }
//     return config
// })

export default http;

