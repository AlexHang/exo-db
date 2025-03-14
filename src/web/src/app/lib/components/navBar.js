"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const NavBar = () => {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);
    return (
        <header className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="text-xl text-black font-bold">Exo-db</div>
            <nav className="flex space-x-4">
                <Link href="/">
                    <span className="text-blue-500 hover:underline">Home</span>
                </Link>
                {
                    token ? (
                        <Link href="/new">
                            <span className="text-blue-500 hover:underline">New Planet</span>
                        </Link>
                    ) : null
                }
                <Link href="/login">
                    <span className="text-blue-500 hover:underline">Login</span>
                </Link>
                <Link href="/signup">
                    <span className="text-blue-500 hover:underline">Sign Up</span>
                </Link>
            </nav>
        </header>
    );
}

export default NavBar;