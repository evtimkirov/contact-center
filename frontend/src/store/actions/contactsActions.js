export const setContacts = (contacts) => ({
    type: "SET_CONTACTS",
    payload: contacts,
});

export const addContact = (contact) => ({
    type: "ADD_CONTACT",
    payload: contact,
});

export const updateContactAction = (contact) => ({
    type: "UPDATE_CONTACT",
    payload: contact,
});

export const deleteContactAction = (id) => ({
    type: "DELETE_CONTACT",
    payload: id,
});
