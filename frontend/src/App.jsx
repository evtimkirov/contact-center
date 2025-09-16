import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./store/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import Navbar from "./components/Navbar";

function AppContent() {
    const { state } = useAuth();

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <BrowserRouter>
                    <Routes>
                        {state.user ? (
                            <>
                                <Route path="/" element={<Home />} />
                                <Route path="/contacts" element={<Contacts />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        ) : (
                            <>
                                <Route path="*" element={<Login />} />
                            </>
                        )}
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
