import React, { useEffect, useState } from "react";
import { getContacts } from "../api/contacts";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 5;

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

    // calculate pagination
    const indexOfLast = currentPage * contactsPerPage;
    const indexOfFirst = indexOfLast - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(contacts.length / contactsPerPage);

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
                {currentContacts.length ? (
                    currentContacts.map(contact => (
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
                    ))
                ) : (
                    <tr><td colSpan="5">No contacts found.</td></tr>
                )}
                </tbody>
            </table>

            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        >
                            Previous
                        </button>
                    </li>

                    {[...Array(totalPages)].map((_, i) => (
                        <li
                            key={i + 1}
                            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                        >
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
