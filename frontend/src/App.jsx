import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider, useAuth } from "./store/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import Navbar from "./components/Navbar";
import ContactDetails from "./pages/ContactDetails";

function AppContent() {
    const { state, logout } = useAuth();

    return (
        <>
            {state.user && <Navbar user={state} onLogout={logout} />}
            <div className="container mt-4">
                <Routes>
                    {state.user ? (
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

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
