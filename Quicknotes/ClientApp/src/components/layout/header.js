import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header">
            <h1>Quicknotes</h1>
            <Link to="/">Home</Link> | <Link to="/about">About</Link>
        </header>
        )
}