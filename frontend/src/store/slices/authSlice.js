import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, fetchUser } from "../../api/auth";

// Async thunks
export const loginUser = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
    try {
        const res = await login(email, password);

        return res.data.user;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await logout();

        return true;
    } catch (err) {
        return thunkAPI.rejectWithValue("Logout failed");
    }
});

export const fetchCurrentUser = createAsyncThunk("auth/fetchUser", async (_, thunkAPI) => {
    try {
        const user = await fetchUser();

        return user;
    } catch (err) {
        return thunkAPI.rejectWithValue("Not authenticated");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })

            // Fetch user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
