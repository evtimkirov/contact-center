import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, createContact, updateContact, deleteContact, getContactDetails } from '../../api/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const res = await getContacts();

    return res.data.contacts;
});

export const getContact = createAsyncThunk('contacts/getContact', async (id) => {
    const res = await getContactDetails(id);

    return res.data;
});


export const addContact = createAsyncThunk('contacts/addContact', async (data) => {
    const res = await createContact(data);

    return res.data;
});

export const editContact = createAsyncThunk('contacts/editContact', async ({ id, data }) => {
    const res = await updateContact(id, data);

    return res.data;
});

export const removeContact = createAsyncThunk('contacts/removeContact', async (id) => {
    await deleteContact(id);

    return id;
});

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
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
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editContact.fulfilled, (state, action) => {
                const index = state.items.findIndex(c => c.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(removeContact.fulfilled, (state, action) => {
                state.items = state.items.filter(c => c.id !== action.payload);
            });
    },
});

export default contactsSlice.reducer;
