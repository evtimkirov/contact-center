import React from 'react';
import { Link } from 'react-router-dom';
import {APP_ROUTES} from "../constants/routes";

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link
                    className="navbar-brand"
                    to={APP_ROUTES.HOME}
                >
                    Contact center
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {user && (
                            <>
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="contactsDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Contacts
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="contactsDropdown">
                                        <li>
                                            <Link className="dropdown-item" to={APP_ROUTES.CONTACTS}>
                                                List
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to={APP_ROUTES.CREATE_CONTACT}>
                                                New Contact
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary ms-2" onClick={onLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
