import api from "./axios";

export async function login(email, password) {
    await api.get("/sanctum/csrf-cookie");

    return api.post("/login", { email, password });
}


export function logout() {
    return api.post("/logout");
}

export function fetchUser() {
    return api.get("/user");
}
