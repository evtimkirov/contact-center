import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../store/thunks/contactThunks";
import ContactForm from "../components/ContactForm";
import { useNavigate } from "react-router-dom";

export default function CreateContact() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(
        {
            name: "",
            email: "",
            phone: "",
            company: "",
        });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        dispatch(addContact(form))
            .unwrap()
            .then(() => {
                navigate("/contacts");
            })
            .catch(err => {
                if (typeof err === "string") {
                    setError(err);
                } else if (err && typeof err === "object") {
                    setError(Object.values(err).join(", "));
                } else {
                    setError("Failed to create contact");
                }
            })
            .finally(() => setLoading(false));
    };

    return <ContactForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
    />;
}
