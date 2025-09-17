import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContact, editContact } from "../store/slices/contactsSlice";

export default function ContactDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const contactFromStore = useSelector(state =>
        state.contacts.items.find(contact => contact.id === parseInt(id))
    );

    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setLoading(true);
        dispatch(getContact(id))
            .unwrap()
            .then(res => {
                setForm({
                    name: res.name,
                    email: res.email,
                    phone: res.phone,
                    company: res.company,
                });
                setLoading(false);
            })
            .catch(() => {
                setErrorMessage("Failed to load contact details.");
                setLoading(false);
            });
    }, [dispatch, id]);

    const handleChange = e => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        setSuccessMessage("");
        setErrorMessage("");
        dispatch(editContact({ id, data: form }))
            .unwrap()
            .then(updatedContact => {
                setSuccessMessage("Contact saved successfully!");
                setForm({
                    name: updatedContact.name,
                    email: updatedContact.email,
                    phone: updatedContact.phone,
                    company: updatedContact.company,
                });
            })
            .catch(() => {
                setErrorMessage("Failed to save contact.");
            });
    };

    if (loading) return <p>Loading...</p>;
    if (!contactFromStore) return <p>Contact not found</p>;

    const interactions = contactFromStore?.interactions || [];

    return (
        <div>
            <h2>Contact Details</h2>

            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <div className="mb-3">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label>Phone:</label>
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label>Company:</label>
                <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>

            <button className="btn btn-success" onClick={handleSave}>
                Save
            </button>

            <h3 className="mt-4">Interactions</h3>
            {interactions.length ? (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>Time</td>
                        <td>Type</td>
                        <td>Notes</td>
                    </tr>
                    </thead>
                    <tbody>
                    {interactions.map(interaction => (
                        <tr key={interaction.id}>
                            <td>{interaction.timestamp}</td>
                            <td>
                                {interaction.type === "inactive" ? (
                                    <span className="badge bg-danger">Inactive</span>
                                ) : (
                                    <span className="badge bg-success">Active</span>
                                )}
                            </td>
                            <td className="font-monospace">{interaction.note}</td>
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
