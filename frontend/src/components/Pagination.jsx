// src/components/Pagination.jsx
import React from "react";

export default function Pagination({ currentPage, setCurrentPage, totalPages }) {
    if (totalPages <= 1) return null;

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        Previous
                    </button>
                </li>

                {[...Array(totalPages)].map((_, i) => (
                    <li
                        key={i + 1}
                        className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                    >
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}
