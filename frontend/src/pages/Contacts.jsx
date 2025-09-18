import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, removeContact } from "../store/thunks/contactThunks";
import { clearMessages } from "../store/slices/contactsSlice";
import SearchSort from "../components/SearchSort";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import {APP_ROUTES} from "../constants/routes";

export default function Contacts() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector(state => state.contacts);

    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 5;
    const [sortField, setSortField] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchContacts());
        dispatch(clearMessages());
    }, [dispatch]);

    if (loading) return <p>Loading contacts...</p>;

    // Search filter
    let filteredContacts = items.filter(contact =>
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
            <h2>Contacts</h2>
            <SearchSort
                search={search}
                setSearch={setSearch}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

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
                                <Link to={APP_ROUTES.CONTACT_DETAILS(contact.id)} className="btn btn-outline-info">
                                    Details
                                </Link>
                                <button
                                    className="btn btn-outline-danger ms-2"
                                    onClick={async () => {
                                        if (window.confirm("Are you sure you want to delete this contact?")) {
                                            const resultAction = await dispatch(removeContact(contact.id));
                                            if (removeContact.fulfilled.match(resultAction)) {
                                                dispatch(fetchContacts());
                                            }
                                        }
                                    }}
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No contacts found.</td>
                    </tr>
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
