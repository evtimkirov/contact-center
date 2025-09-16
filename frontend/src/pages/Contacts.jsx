import React, { useEffect, useState } from "react";
import { getContacts } from "../api/contacts";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getContacts()
            .then(res => {
                setContacts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load contacts.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading contacts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Contacts</h2>
            {contacts.length ? (
                contacts.map(contact => <div key={contact.id}>{contact.name}</div>)
            ) : (
                <p>No contacts found.</p>
            )}
        </div>
    );
}
