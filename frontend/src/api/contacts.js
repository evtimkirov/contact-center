import api from "./axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const getContacts = () => api.get(API_ENDPOINTS.CONTACTS);
export const createContact = (data) => api.post(API_ENDPOINTS.CREATE_CONTACT, data);
export const updateContact = (id, data) => api.put(API_ENDPOINTS.UPDATE_CONTACT(id), data);
export const deleteContact = (id) => api.delete(API_ENDPOINTS.DELETE_CONTACT(id));

export function getContactDetails(id) {
    return api.get(API_ENDPOINTS.CONTACT_DETAILS(id));
}
