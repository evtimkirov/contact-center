import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, fetchUser } from '../../api/auth';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
    try {
        await login(email, password);

        const user = await fetchUser();

        return user;
    } catch (err) {
        if (err.response && (err.response.status >= 400 || err.response.status < 500)) {
            return rejectWithValue('Wrong credentials.');
        }
        throw err;
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await logout();

    return null;
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
    const user = await fetchUser();

    return user;
});