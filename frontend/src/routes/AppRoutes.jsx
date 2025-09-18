import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Contacts from "../pages/Contacts";
import ContactDetails from "../pages/ContactDetails";
import CreateContact from "../pages/CreateContact";
import Login from "../pages/Login";

export default function AppRoutes({ user }) {
    return (
        <Routes>
            {user ? (
                <>
                    <Route path="/" element={<Home />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/contacts/:id" element={<ContactDetails />} />
                    <Route path="/contacts/new" element={<CreateContact />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            ) : (
                <Route path="*" element={<Login />} />
            )}
        </Routes>
    );
}
