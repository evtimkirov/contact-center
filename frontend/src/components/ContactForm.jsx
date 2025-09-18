import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from "../store/slices/contactsSlice";
import {useLocation} from "react-router-dom";

const flattenErrors = (err) => {
    const result = [];

    const traverse = (obj) => {
        if (!obj) return;

        if (typeof obj === "string") {
            result.push(obj);
        } else if (Array.isArray(obj)) {
            obj.forEach(traverse);
        } else if (typeof obj === "object") {
            Object.values(obj).forEach(traverse);
        }
    };

    traverse(err);
    return result;
};

export default function ContactForm({ form, setForm, onSubmit, loading }) {
    const dispatch = useDispatch();
    const { error, successMessage } = useSelector((state) => state.contacts);
    const location = useLocation();

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    useEffect(() => {
        if (successMessage || error) {
            const timer = setTimeout(() => dispatch(clearMessages()), 3000);

            return () => clearTimeout(timer);
        }

        if (location) {
            dispatch(clearMessages());
        }
    }, [successMessage, error, dispatch, location]);

    const errorMessages = flattenErrors(error);

    return (
        <form onSubmit={onSubmit}>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div>
                {errorMessages.length > 0 && (
                    <div className="alert alert-danger">
                        <ul>
                            {errorMessages.map((msg, idx) => (
                                <li key={idx}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="mb-3">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-control"
                    required
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
                    required
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

            <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>
        </form>
    );
}
