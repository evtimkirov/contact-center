import React, { useEffect, useState } from "react";
import { getContacts } from "../api/contacts";
import SearchSort from "../components/SearchSort";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 5;
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");

    useEffect(() => {
        getContacts()
            .then(res => {
                setContacts(res.data.contacts);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load contacts.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading contacts...</p>;
    if (error) return <p>{error}</p>;

    // Search filter
    let filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    // Order by
    filteredContacts.sort((a, b) => {
        let valA = a[sortField] || "";
        let valB = b[sortField] || "";

        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const indexOfLast = currentPage * contactsPerPage;
    const indexOfFirst = indexOfLast - contactsPerPage;
    const currentContacts = filteredContacts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

    return (
        <div>
            <h2>Contacts list</h2>
            <SearchSort
                search={search}
                setSearch={setSearch}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            {/* Contacts list */}
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
                                <Link to={`/contacts/${contact.id}`} className="btn btn-outline-info">
                                    Details
                                </Link>
                                <button className="btn btn-outline-danger ms-2">Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="5">No contacts found.</td></tr>
                )}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
            />
        </div>
    );
}
