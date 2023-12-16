import axios from 'axios';
import { confirmDialog } from 'primereact/confirmdialog';
import { AppProps } from './AppProps';
import { MethodEnum } from './MethodEnum';


const BASE_URL = 'http://localhost:5000';
const AUTH_TOKEN = `Bearer ${localStorage.getItem(AppProps.ACCESS_TOKEN)}`;

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


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    console.log(`REQUEST_ERROR:`, error);
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(`INTERCEPTOR:`, response)
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
            header: `ERROR [${error.code}]`,
            style: { minWidth: '20rem', maxWidth: '25rem' },
            icon: 'pi pi-exclamation-triangle',
            accept: () => { },
        });
    }
    return Promise.reject(error);
});

const AxiosInstanceService = (url, method, params = {}) => {
    const param = JSON.stringify(params);

    switch (method) {
        case MethodEnum.GET:
            return AxiosInstance.get(url);
        case MethodEnum.POST:
            return AxiosInstance.post(url, param);
        case MethodEnum.PUT:
            return AxiosInstance.put(url, param);
        case MethodEnum.PATCH:
            return AxiosInstance.put(url, param);
        case MethodEnum.DELETE:
            return AxiosInstance.put(url);
        default:
            break;
    }
}

export default AxiosInstanceService;