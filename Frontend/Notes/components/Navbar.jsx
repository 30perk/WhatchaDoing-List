"use client"; 

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-center bg-gray-950 px-8 py-10 rounded-2xl">
            <Link className="text-white font-bold text-4xl" href={"/"}>Whatcha Doin?</Link>
        </nav>
    )
}

