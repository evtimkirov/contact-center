import { createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts, createContact, updateContact, deleteContact, getContactDetails } from '../../api/contacts';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const res = await getContacts();
    return res.data.contacts;
});

export const getContact = createAsyncThunk(
    'contacts/getContact',
    async (id, { rejectWithValue }) => {
        try {
            const res = await getContactDetails(id);
            return res.data;
        } catch (err) {
            if (err.response && (err.response.status === 404 || err.response.status === 422)) {
                return rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (data, { rejectWithValue }) => {
        try {
            const res = await createContact(data);
            return res.data;
        } catch (err) {
            if (err.response && (err.response.status === 404 || err.response.status === 422)) {
                return rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);

export const editContact = createAsyncThunk(
    'contacts/editContact',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateContact(id, data);
            return res.data;
        } catch (err) {
            if (err.response && err.response.status === 422) {
                return rejectWithValue(err.response.data);
            }
            throw err;
        }
    }
);

export const removeContact = createAsyncThunk('contacts/removeContact', async (id) => {
    await deleteContact(id);
    return id;
});
