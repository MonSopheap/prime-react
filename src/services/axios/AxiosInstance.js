import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 1000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Custom-Header': 'Custom ValueX',
    },
});
localStorage.setItem("access_token", "1eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VyTmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkSkljVlRybG5mamVUQ3hFSk5LRGtKdTZrdmxJWUZXa1dlMllxNzY1MHBRZC52dUlFa0pEbzIiLCJwYXNzd29yZEhhc2hlZCI6bnVsbCwicGFzc3dvcmRTYWx0IjpudWxsLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImNyZWF0ZWRCeSI6ImFkbWluIiwidXBkYXRlZEJ5IjpudWxsLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0xMS0yMFQwMzoxNDowMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0xMS0yMFQwMzoxNDowMi4wMDBaIn0sImlhdCI6MTcwMDczMDE5NCwiZXhwIjoxNzAwNzczMzk0fQ.DdjGaJPGUjV8WZ-qpQxTCFYk8YKDJYoK4Plg6-LSemQ")
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    console.log(`CONFIG:`, config)
    // Do something before request is sent
    return config;
}, function (error) {
    console.log(`REQUEST_ERROR: ${error}`)
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log(`RESPONSE_ERROR: ${error}`)
    return Promise.reject(error);
});

export default axiosInstance;