import React from "react";

export default function SearchSort({ search, setSearch, sortField, setSortField, sortOrder, setSortOrder }) {
    return (
        <div className="mb-3 d-flex gap-2 justify-content-end">
            <div className="row ms-1">
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search by name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ maxWidth: "150px" }}
                />
            </div>
            <div className="row ms-2">
                <select
                    className="form-select form-select-sm"
                    value={sortField}
                    onChange={e => setSortField(e.target.value)}
                    style={{ maxWidth: "120px" }}
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="created_at">Created at</option>
                    <option value="updated_at">Updated at</option>
                </select>
            </div>
            <div className="row ms-2">
                <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                    {sortOrder === "asc" ? "↑ ASC" : "↓ DESC"}
                </button>
            </div>
        </div>
    );
}
