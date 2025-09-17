import axios from "axios";

const authApi = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        "Accept": "application/json",
    },
});

export default authApi;
