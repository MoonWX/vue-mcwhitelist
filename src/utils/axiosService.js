// axiosService.js
import axios from "axios";

// 创建axios实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://api.moonwx.net/'
        : 'https://127.0.0.1:7001/',
    timeout: 15000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
    },
    withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 可以在这里添加loading状态
        // store.commit('SET_LOADING', true);

        // 如果有token，可以在这里添加到header
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers['Authorization'] = `Bearer ${token}`;
        // }

        return config;
    },
    error => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 可以在这里关闭loading状态
        // store.commit('SET_LOADING', false);

        return response;
    },
    error => {
        // 可以在这里关闭loading状态
        // store.commit('SET_LOADING', false);

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 未授权，可以在这里处理登出逻辑
                    // store.dispatch('user/logout');
                    // router.push('/login');
                    console.error('Unauthorized, please login');
                    break;
                case 403:
                    console.error('Forbidden access');
                    break;
                case 404:
                    console.error('API not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error(`Error: ${error.response.status}`);
            }
        } else if (error.request) {
            // 请求已经发出，但没有收到响应
            console.error('Network error, no response received');
        } else {
            // 请求配置发生的错误
            console.error('Request configuration error:', error.message);
        }

        return Promise.reject(error);
    }
);

// HTTP 方法封装
const http = {
    get(url, params) {
        return service.get(url, { params });
    },

    post(url, data) {
        return service.post(url, data);
    },

    put(url, data) {
        return service.put(url, data);
    },

    delete(url, params) {
        return service.delete(url, { params });
    },

    // 上传文件
    upload(url, file) {
        const formData = new FormData();
        formData.append('file', file);

        return service.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

// 错误处理函数
export const handleError = (error) => {
    if (error.response) {
        // 服务器返回错误状态码
        const status = error.response.status;
        const message = error.response.data?.message || '服务器错误';
        return {
            status,
            message,
            data: error.response.data
        };
    } else if (error.request) {
        // 请求发出但没有收到响应
        return {
            status: 0,
            message: '网络错误，请检查网络连接',
            data: null
        };
    } else {
        // 请求配置出错
        return {
            status: -1,
            message: error.message || '请求配置错误',
            data: null
        };
    }
};

// 请求方法封装
export async function request(method, url, data = null) {
    try {
        const response = await http[method.toLowerCase()](url, data);
        return {
            status: response.status,
            message: 'success',
            data: response.data
        };
    } catch (error) {
        return handleError(error);
    }
}

// 导出便捷方法
export const get = (url, params) => request('get', url, params);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const del = (url, params) => request('delete', url, params);
export const upload = (url, file) => http.upload(url, file);

// 导出 axios 实例
export default service;
