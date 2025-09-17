import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import ContactDetails from "./pages/ContactDetails";
import Navbar from "./components/Navbar";
import { logoutUser } from "./store/slices/authSlice";

function AppContent() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <>
            {user && <Navbar user={user} onLogout={() => dispatch(logoutUser())} />}
            <div className="container mt-4">
                <Routes>
                    {user ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/contacts" element={<Contacts />} />
                            <Route path="/contacts/:id" element={<ContactDetails />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <Route path="*" element={<Login />} />
                    )}
                </Routes>
            </div>
        </>
    );
}

export default AppContent;
