import api from "./axios";
import authApi from "./authAxios";

export async function login(email, password) {
    await authApi.get("/sanctum/csrf-cookie");

    return api.post("/login", { email, password });
}

export function logout() {
    return api.post("/logout");
}

export async function fetchUser() {
    try {
        const res = await api.get("/user");

        return res.data;
    } catch (err) {
        if (err.response && err.response.status === 401) {
            return null;
        }
        throw err;
    }
}
