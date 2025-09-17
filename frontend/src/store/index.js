import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        auth: authReducer,
    },
});

export default store;
