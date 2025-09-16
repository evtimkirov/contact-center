import React, { useEffect, useState } from "react";
import { getContacts } from "../api/contacts";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getContacts()
            .then(res => {
                setContacts(res.data.contacts);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load contacts.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading contacts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Contacts</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Created at</td>
                        <td>Updated at</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                {contacts.length ? (
                    contacts.map(function(contact) {
                        return (
                            <tr key={contact.id}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.created_at}</td>
                                <td>{contact.updated_at}</td>
                                <td>
                                    <button className="btn btn-outline-warning">
                                        Details
                                    </button>
                                    <button className="btn btn-outline-danger ms-2">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <p>No contacts found.</p>
                )}
                </tbody>
            </table>
        </div>
    );
}
