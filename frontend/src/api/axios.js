import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default api;
