import React from 'react';

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Contact Center</a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {user && (
                            <li className="nav-item">
                                <button className="btn btn-outline-secondary" onClick={onLogout}>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
