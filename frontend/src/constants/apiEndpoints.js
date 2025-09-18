export const API_ENDPOINTS = {
    LOGIN: "/login",
    LOGOUT: "/logout",
    USER: "/user",
    CONTACTS: "/contacts",
    CONTACT_DETAILS: id => `/contacts/${id}`,
    CREATE_CONTACT: "/contacts",
    UPDATE_CONTACT: id => `/contacts/${id}`,
    DELETE_CONTACT: id => `/contacts/${id}`,
};
