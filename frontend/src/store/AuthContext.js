import React, { createContext, useReducer, useContext, useEffect } from "react";
import { authReducer, initialAuthState } from "./reducers/authReducer";
import { setUser, clearUser } from "./actions/authActions";
import { login as apiLogin, logout as apiLogout, fetchUser } from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    useEffect(() => {
        const init = async () => {
            const user = await fetchUser();
            if (user) {
                dispatch(setUser(user));
            } else {
                dispatch(clearUser());
            }
        };

        init();
    }, []);

    const login = async (email, password) => {
        const res = await apiLogin(email, password);
        dispatch(setUser(res.data.user));
    };

    const logout = async () => {
        await apiLogout();
        dispatch(clearUser());
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
