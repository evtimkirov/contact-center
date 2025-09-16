import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getContactDetails } from "../api/contacts";

export default function ContactDetails() {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getContactDetails(id)
            .then(res => {
                setContact(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load contact details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!contact) return <p>Contact not found</p>;

    return (
        <div>
            <h2>{contact.name}</h2>
            <p>Email: {contact.email}</p>
            <p>Phone number: {contact.phone}</p>
            <p>Company name: {contact.company}</p>
            <p>Created at: {contact.created_at}</p>
            <p>Updated at: {contact.updated_at}</p>

            <h3>Interactions</h3>
            {contact.interactions.length ? (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>Time</td>
                        <td>Type</td>
                        <td>Notes</td>
                    </tr>
                    </thead>
                    <tbody>
                    {contact.interactions.map(interaction => (
                        <tr key={interaction.id}>
                            <td>{interaction.timestamp}</td>
                            <td>
                                {
                                    interaction.type === 'inactive' ?
                                        <span className="badge bg-danger">Inactive</span> :
                                        <span className="badge bg-success">Active</span>
                                }
                            </td>
                            <td  className="font-monospace">
                                {interaction.note}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No interactions yet.</p>
            )}
        </div>
    );
}
