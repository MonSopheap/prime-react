import axios from 'axios';
import { MethodEnum } from '../../commom/Enum';
import { confirmDialog } from 'primereact/confirmdialog';


localStorage.setItem("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyTmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkSkljVlRybG5mamVUQ3hFSk5LRGtKdTZrdmxJWUZXa1dlMllxNzY1MHBRZC52dUlFa0pEbzIiLCJwYXNzd29yZEhhc2hlZCI6bnVsbCwicGFzc3dvcmRTYWx0IjpudWxsLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImNyZWF0ZWRCeSI6ImFkbWluIiwidXBkYXRlZEJ5IjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0xMS0yMFQwMzoxNDowMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0xMS0yMFQwMzoxNDowMi4wMDBaIn0sImlhdCI6MTcwMTMxNjc2OCwiZXhwIjoxNzAxMzU5OTY4fQ.IKRx_CLZf8whM7FQfbK35gimnFBzry_HlZqQpo_6xwE")

const BASE_URL = 'http://localhost:5000';
const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;

// Set config defaults when creating the instance
export const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "X-Mobile": 'abc123abc123'
    }
});

// Alter defaults after instance has been created
AxiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
AxiosInstance.defaults.timeout = 2500;

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(`INTERCEPTOR:`, response)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(`INTERCEPTOR_ERROR:`, error);

    if (error) {
        confirmDialog({
            draggable: false,
            trigger: null,
            message: `${error.message}`,
            header: `ERROR ${error.response.statusText}`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => { },
        });
    }

    return Promise.reject(error);
});

const AxiosInstanceService = (url, method, params = {}) => {
    switch (method) {
        case MethodEnum.GET:
            return AxiosInstance.get(url);
        case MethodEnum.POST:
            return AxiosInstance.post(url, params);
        case MethodEnum.PUT:
            return AxiosInstance.put(url, params);
        case MethodEnum.PATCH:
            return AxiosInstance.put(url, params);
        case MethodEnum.DELETE:
            return AxiosInstance.put(url);
        default:
            break;
    }
}

export default AxiosInstanceService;