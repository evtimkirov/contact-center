import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
    const [user, setUser] = useState(null);

    return (
        <>
            <Navbar user={user} onLogout={() => setUser(null)} />
            <div className="container mt-4">
                {!user ? (
                    <Login onLogin={(u) => setUser(u)} />
                ) : (
                    <Home user={user} onLogout={() => setUser(null)} />
                )}
            </div>
        </>
    );
}

export default App;
