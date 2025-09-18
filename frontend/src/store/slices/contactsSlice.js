import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, getContact, addContact, editContact, removeContact } from '../thunks/contactThunks';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getContact.fulfilled, (state, action) => {
                const index = state.items.findIndex(contact => contact.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(editContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(editContact.fulfilled, (state, action) => {
                state.loading = false;

                const index = state.items.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = {
                        ...state.items[index],
                        ...action.payload
                    };
                }

                state.successMessage = 'Contact updated successfully.';
            })
            .addCase(editContact.rejected, (state, action) => {
                state.loading = false;

                const errs = action.payload?.errors || action.payload?.message || action.error.message || "Something went wrong";
                if (typeof errs === "string") {
                    state.error = { general: errs };
                } else {
                    state.error = errs;
                }
            })
            .addCase(addContact.rejected, (state, action) => {
                state.loading = false;
                if (action.payload?.errors) {
                    state.error = action.payload.errors;
                } else if (action.payload?.message) {
                    state.error = { general: action.payload.message };
                } else {
                    state.error = { general: action.error.message || "Something went wrong" };
                }
            })
            .addCase(addContact.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
                state.successMessage = 'Contact created successfully.';
            });
    },
});

export const { clearMessages } = contactsSlice.actions;
export default contactsSlice.reducer;
