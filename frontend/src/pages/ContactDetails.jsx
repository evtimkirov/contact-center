import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getContact, editContact } from "../store/thunks/contactThunks";
import ContactForm from "../components/ContactForm";

export default function ContactDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const contact = useSelector(state => state.contacts.items.find(c => c.id === parseInt(id)));

    const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const interactions = contact?.interactions || [];

    useEffect(() => {
        dispatch(getContact(id))
            .unwrap()
            .then(res => setForm({
                name: res.name,
                email: res.email,
                phone: res.phone,
                company: res.company
            }))
            .catch(() => setError({ general: "Failed to load contact details" }))
            .finally(() => setLoading(false));
    }, [dispatch, id]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(editContact({ id, data: form }))
            .unwrap()
            .catch(err => setError(err.errors || { general: err.message || "Failed to update contact" }));
    };

    return (
        <>
            <ContactForm form={form} setForm={setForm} onSubmit={handleSubmit} loading={loading} />

            {interactions.length > 0 && (
                <>
                    <h3 className="mt-4">Interactions</h3>
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
                                    <span className={`badge ${interaction.type === "inactive" ? "bg-danger" : "bg-success"}`}>
                                        {interaction.type === "inactive" ? "Inactive" : "Active"}
                                    </span>
                                </td>
                                <td className="font-monospace">{interaction.note}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}
