import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, getCurrentUser } from "../thunks/authThunks";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
                state.error = action.payload || action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export default authSlice.reducer;
